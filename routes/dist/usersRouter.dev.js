"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRouter = void 0;

var _express = _interopRequireDefault(require("express"));

var _usersController = require("../controllers/usersController.js");

var _catchError = require("../utils/catchError.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var usersRouter = _express["default"].Router();

exports.usersRouter = usersRouter;
usersRouter.post('/crocodileusers', (0, _catchError.catchError)(_usersController.usersController.add));