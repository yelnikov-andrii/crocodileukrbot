import TelegramBotApi from "node-telegram-bot-api";
import { words } from './data.js';
import express from 'express';
import cors from 'cors';
import { usersRouter } from './routes/usersRouter.js';
import { Userbot } from "./models/User.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true} ));

app.use(usersRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

const token = '5674068621:AAGTpIFz8_OXLxhDfGaX37kMbyMqiw2LWGE';
const bot = new TelegramBotApi(token, {polling: true});

let isStarted = false;
let whoIsThePlayer = null;
let whoIsThePlayerName = null;
let word = generateWord();
console.log(word, whoIsThePlayer, whoIsThePlayerName);

function generateWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  const randomElement = words[randomIndex];
  return randomElement;
}

bot.onText(/\/startcroco/, (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userDisplayName = msg.from.first_name;
  const userId = msg.from.id;
  const userLink = `<a href="tg://user?id=${userId}">${userDisplayName}</a>`;

  if (isStarted === true) {
    bot.sendMessage(chatId, `${whoIsThePlayerName} вже розпочав гру і він пояснює слово`,{
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Подивитись слово', callback_data: 'button1' }],
          [{ text: 'Змінити слово', callback_data: 'button2' }]
        ]
      }
    });
    return;
  } else {
    bot.sendMessage(chatId, `${userLink} пояснює слово.`,{
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Подивитись слово', callback_data: 'button1' }],
          [{ text: 'Змінити слово', callback_data: 'button2' }]
        ]
      }
    });
    whoIsThePlayer = userId;
    whoIsThePlayerName = userDisplayName;
    isStarted = true;
  }
});

bot.onText(/\/rulescroco/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, `Правила гри в крокодила

    Є ведучий та гравці, які відгадують слова.
   
    Після натискання /startcroco задача ведучого — натиснути кнопку "Подивитись слово" і пояснити його, не використовуючи однокорінні слова.
    Якщо слово не подобається, то можно натиснути "Наступне слово".
    Задача гравців — відгадати слово, для цього потрібно просто писати їх у чат, по одному слову в повідомленні.`,{
      parse_mode: 'HTML',
    });
});

bot.onText(/\/ratingcroco/, async (msg) => {
  const chatId = msg.chat.id;

  const list = await Userbot.findAll({ limit: 10 });
  const listText = list.map(item => `<b>${item.name}</b> - ${item.score}`).join('\n');

    bot.sendMessage(chatId, `${listText}`,{
      parse_mode: 'HTML',
    });

});

bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;
  const userDisplayName = msg.from.first_name;
  const userId = msg.from.id;
  const userLink = `<a href="tg://user?id=${userId}">${userDisplayName}</a>`;

  if (text.toLowerCase() === word.toLowerCase() && msg.from.id !== whoIsThePlayer) {
    bot.sendMessage(chatId, `${userLink} відгадав слово`,{
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [
          [{ text: 'Хочу бути ведучим', callback_data: 'button3' }],
        ]
      }
    });

    const foundUser = await Userbot.findOne({where: {
      userId
    }});

    if (!foundUser) {
      await Userbot.create({
        name: userDisplayName,
        userId: userId,
        score: 1,
      })
    } else {
      foundUser.score = foundUser.score + 1;
      await foundUser.save();
    }

    word = generateWord();
    whoIsThePlayer = null;
  }

});

bot.on('callback_query', (query) => {
  if (query.data === 'button1' && query.from.id === whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: word,
      show_alert: true
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button1' && query.from.id !== whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Це слово не для тебе!',
      show_alert: true
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button2' && query.from.id === whoIsThePlayer) {
    word = generateWord();
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: word,
      show_alert: true
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button2' && query.from.id !== whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Це слово не для тебе!',
      show_alert: true
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button3' && whoIsThePlayer === null) {
    whoIsThePlayer = query.from.id;
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: `Ти ведучий твоє слово ${word}`,
      show_alert: true
    })
    .then(() => {
      const userDisplayName = query.from.first_name;
      const userLink = `<a href="tg://user?id=${whoIsThePlayer}">${userDisplayName}</a>`;
  
      bot.sendMessage(query.message.chat.id, `${userLink} пояснює слово.`,{
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [
            [{ text: 'Подивитись слово', callback_data: 'button1' }],
            [{ text: 'Змінити слово', callback_data: 'button2' }]
          ]
        }
      });
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button3' && whoIsThePlayer !== null) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Ведучого вже обрано',
      show_alert: true
    })
    .catch((error) => {
      console.log('Error answering callback query:', error);
    });
  }
});





