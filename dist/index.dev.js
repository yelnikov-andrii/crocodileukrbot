"use strict";

var _nodeTelegramBotApi = _interopRequireDefault(require("node-telegram-bot-api"));

var _data = require("./data.js");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _usersRouter = require("./routes/usersRouter.js");

var _User = require("./models/User.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
app.use((0, _cors["default"])());
app.use(_express["default"].json());
app.use(_express["default"].urlencoded({
  extended: true
}));
app.use(_usersRouter.usersRouter);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server is running on ".concat(PORT));
});
var token = '5674068621:AAGTpIFz8_OXLxhDfGaX37kMbyMqiw2LWGE';
var bot = new _nodeTelegramBotApi["default"](token, {
  polling: true
});
var isStarted = false;
var whoIsThePlayer = null;
var whoIsThePlayerName = null;
var word = generateWord();
console.log(word, whoIsThePlayer, whoIsThePlayerName);

function generateWord() {
  var randomIndex = Math.floor(Math.random() * _data.words.length);
  var randomElement = _data.words[randomIndex];
  return randomElement;
}

bot.onText(/\/startcroco/, function (msg) {
  var text = msg.text;
  var chatId = msg.chat.id;
  var userDisplayName = msg.from.first_name;
  var userId = msg.from.id;
  var userLink = "<a href=\"tg://user?id=".concat(userId, "\">").concat(userDisplayName, "</a>");

  if (isStarted === true) {
    bot.sendMessage(chatId, "".concat(whoIsThePlayerName, " \u0432\u0436\u0435 \u0440\u043E\u0437\u043F\u043E\u0447\u0430\u0432 \u0433\u0440\u0443 \u0456 \u0432\u0456\u043D \u043F\u043E\u044F\u0441\u043D\u044E\u0454 \u0441\u043B\u043E\u0432\u043E"), {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[{
          text: 'Подивитись слово',
          callback_data: 'button1'
        }], [{
          text: 'Змінити слово',
          callback_data: 'button2'
        }]]
      }
    });
    return;
  } else {
    bot.sendMessage(chatId, "".concat(userLink, " \u043F\u043E\u044F\u0441\u043D\u044E\u0454 \u0441\u043B\u043E\u0432\u043E."), {
      parse_mode: 'HTML',
      reply_markup: {
        inline_keyboard: [[{
          text: 'Подивитись слово',
          callback_data: 'button1'
        }], [{
          text: 'Змінити слово',
          callback_data: 'button2'
        }]]
      }
    });
    whoIsThePlayer = userId;
    whoIsThePlayerName = userDisplayName;
    isStarted = true;
  }
});
bot.onText(/\/rulescroco/, function (msg) {
  var chatId = msg.chat.id;
  bot.sendMessage(chatId, "\u041F\u0440\u0430\u0432\u0438\u043B\u0430 \u0433\u0440\u0438 \u0432 \u043A\u0440\u043E\u043A\u043E\u0434\u0438\u043B\u0430\n\n    \u0404 \u0432\u0435\u0434\u0443\u0447\u0438\u0439 \u0442\u0430 \u0433\u0440\u0430\u0432\u0446\u0456, \u044F\u043A\u0456 \u0432\u0456\u0434\u0433\u0430\u0434\u0443\u044E\u0442\u044C \u0441\u043B\u043E\u0432\u0430.\n   \n    \u041F\u0456\u0441\u043B\u044F \u043D\u0430\u0442\u0438\u0441\u043A\u0430\u043D\u043D\u044F /startcroco \u0437\u0430\u0434\u0430\u0447\u0430 \u0432\u0435\u0434\u0443\u0447\u043E\u0433\u043E \u2014 \u043D\u0430\u0442\u0438\u0441\u043D\u0443\u0442\u0438 \u043A\u043D\u043E\u043F\u043A\u0443 \"\u041F\u043E\u0434\u0438\u0432\u0438\u0442\u0438\u0441\u044C \u0441\u043B\u043E\u0432\u043E\" \u0456 \u043F\u043E\u044F\u0441\u043D\u0438\u0442\u0438 \u0439\u043E\u0433\u043E, \u043D\u0435 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E\u0447\u0438 \u043E\u0434\u043D\u043E\u043A\u043E\u0440\u0456\u043D\u043D\u0456 \u0441\u043B\u043E\u0432\u0430.\n    \u042F\u043A\u0449\u043E \u0441\u043B\u043E\u0432\u043E \u043D\u0435 \u043F\u043E\u0434\u043E\u0431\u0430\u0454\u0442\u044C\u0441\u044F, \u0442\u043E \u043C\u043E\u0436\u043D\u043E \u043D\u0430\u0442\u0438\u0441\u043D\u0443\u0442\u0438 \"\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0435 \u0441\u043B\u043E\u0432\u043E\".\n    \u0417\u0430\u0434\u0430\u0447\u0430 \u0433\u0440\u0430\u0432\u0446\u0456\u0432 \u2014 \u0432\u0456\u0434\u0433\u0430\u0434\u0430\u0442\u0438 \u0441\u043B\u043E\u0432\u043E, \u0434\u043B\u044F \u0446\u044C\u043E\u0433\u043E \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u043E \u043F\u0440\u043E\u0441\u0442\u043E \u043F\u0438\u0441\u0430\u0442\u0438 \u0457\u0445 \u0443 \u0447\u0430\u0442, \u043F\u043E \u043E\u0434\u043D\u043E\u043C\u0443 \u0441\u043B\u043E\u0432\u0443 \u0432 \u043F\u043E\u0432\u0456\u0434\u043E\u043C\u043B\u0435\u043D\u043D\u0456.", {
    parse_mode: 'HTML'
  });
});
bot.onText(/\/ratingcroco/, function _callee(msg) {
  var chatId, list, listText;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          chatId = msg.chat.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_User.Userbot.findAll({
            limit: 10
          }));

        case 3:
          list = _context.sent;
          listText = list.map(function (item) {
            return "<b>".concat(item.name, "</b> - ").concat(item.score);
          }).join('\n');
          bot.sendMessage(chatId, "".concat(listText), {
            parse_mode: 'HTML'
          });

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
});
bot.on('message', function _callee2(msg) {
  var text, chatId, userDisplayName, userId, userLink, foundUser;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          text = msg.text;
          chatId = msg.chat.id;
          userDisplayName = msg.from.first_name;
          userId = msg.from.id;
          userLink = "<a href=\"tg://user?id=".concat(userId, "\">").concat(userDisplayName, "</a>");

          if (!(text.toLowerCase() === word.toLowerCase() && msg.from.id !== whoIsThePlayer)) {
            _context2.next = 20;
            break;
          }

          bot.sendMessage(chatId, "".concat(userLink, " \u0432\u0456\u0434\u0433\u0430\u0434\u0430\u0432 \u0441\u043B\u043E\u0432\u043E"), {
            parse_mode: 'HTML',
            reply_markup: {
              inline_keyboard: [[{
                text: 'Хочу бути ведучим',
                callback_data: 'button3'
              }]]
            }
          });
          _context2.next = 9;
          return regeneratorRuntime.awrap(_User.Userbot.findOne({
            where: {
              userId: userId
            }
          }));

        case 9:
          foundUser = _context2.sent;

          if (foundUser) {
            _context2.next = 15;
            break;
          }

          _context2.next = 13;
          return regeneratorRuntime.awrap(_User.Userbot.create({
            name: userDisplayName,
            userId: userId,
            score: 1
          }));

        case 13:
          _context2.next = 18;
          break;

        case 15:
          foundUser.score = foundUser.score + 1;
          _context2.next = 18;
          return regeneratorRuntime.awrap(foundUser.save());

        case 18:
          word = generateWord();
          whoIsThePlayer = null;

        case 20:
        case "end":
          return _context2.stop();
      }
    }
  });
});
bot.on('callback_query', function (query) {
  if (query.data === 'button1' && query.from.id === whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: word,
      show_alert: true
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button1' && query.from.id !== whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Це слово не для тебе!',
      show_alert: true
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button2' && query.from.id === whoIsThePlayer) {
    word = generateWord();
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: word,
      show_alert: true
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button2' && query.from.id !== whoIsThePlayer) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Це слово не для тебе!',
      show_alert: true
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button3' && whoIsThePlayer === null) {
    whoIsThePlayer = query.from.id;
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: "\u0422\u0438 \u0432\u0435\u0434\u0443\u0447\u0438\u0439 \u0442\u0432\u043E\u0454 \u0441\u043B\u043E\u0432\u043E ".concat(word),
      show_alert: true
    }).then(function () {
      var userDisplayName = query.from.first_name;
      var userLink = "<a href=\"tg://user?id=".concat(whoIsThePlayer, "\">").concat(userDisplayName, "</a>");
      bot.sendMessage(query.message.chat.id, "".concat(userLink, " \u043F\u043E\u044F\u0441\u043D\u044E\u0454 \u0441\u043B\u043E\u0432\u043E."), {
        parse_mode: 'HTML',
        reply_markup: {
          inline_keyboard: [[{
            text: 'Подивитись слово',
            callback_data: 'button1'
          }], [{
            text: 'Змінити слово',
            callback_data: 'button2'
          }]]
        }
      });
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }

  if (query.data === 'button3' && whoIsThePlayer !== null) {
    bot.answerCallbackQuery({
      callback_query_id: query.id,
      text: 'Ведучого вже обрано',
      show_alert: true
    })["catch"](function (error) {
      console.log('Error answering callback query:', error);
    });
  }
});