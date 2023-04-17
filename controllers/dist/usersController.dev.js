"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersController = void 0;

var _usersService = require("../services/usersService.js");

function add(req, res) {
  var _req$body, name, id;

  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, id = _req$body.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_usersService.usersService.add({
            name: name,
            number: number
          }));

        case 3:
          res.sendStatus(201);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

;
var usersController = {
  add: add
};
exports.usersController = usersController;