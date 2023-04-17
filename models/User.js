import { sequelize } from "../utils/db.js";
import { DataTypes } from 'sequelize';

export const Userbot = sequelize.define('userbot', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.BIGINT, 
    allowNull: false
  }
}, {
  // Other model options go here
});

Userbot.sync();