import { usersService } from "../services/usersService.js";

async function add(req, res) {
  const { name, id } = req.body;
  await usersService.add({name, number});
  res.sendStatus(201);

};

export const usersController = {
  add,
}