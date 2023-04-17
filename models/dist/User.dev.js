"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Userbot = void 0;

var _db = require("../utils/db.js");

var _sequelize = require("sequelize");

var Userbot = _db.sequelize.define('userbot', {
  // Model attributes are defined here
  name: {
    type: _sequelize.DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: _sequelize.DataTypes.BIGINT,
    allowNull: false
  }
}, {// Other model options go here
});

exports.Userbot = Userbot;
Userbot.sync();