import { DataTypes } from "sequelize";
import database from "../config/database.js";

const MemoryCardModel = database.define(
  "memory-card",
  {
    id_card: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    emoji: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default MemoryCardModel;
