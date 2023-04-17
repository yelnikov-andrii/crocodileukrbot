"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersService = void 0;

var _User = require("../models/User.js");

function add(_ref) {
  var name, id;
  return regeneratorRuntime.async(function add$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          name = _ref.name, id = _ref.id;
          _context.next = 3;
          return regeneratorRuntime.awrap(_User.Userbot.create({
            name: name,
            id: id
          }));

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
}

var usersService = {
  add: add
};
exports.usersService = usersService;