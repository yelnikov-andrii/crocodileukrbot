import { Userbot } from "../models/User.js"

async function add({name, id}) {
  await Userbot.create({name, id});
}

export const usersService = {
  add,
}