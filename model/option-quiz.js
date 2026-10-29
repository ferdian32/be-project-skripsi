
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const OptionQuizModel = db.define(
  "option_quiz",
  {
    id_option: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    id_quiz: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    option_text: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

export default OptionQuizModel;
