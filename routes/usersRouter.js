import express from 'express';
import { usersController } from '../controllers/usersController.js';
import { catchError } from '../utils/catchError.js';

export const usersRouter = express.Router();


usersRouter.post('/crocodileusers', catchError(usersController.add));