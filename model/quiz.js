import { DataTypes } from "sequelize";
import database from "../config/database.js";
import OptionQuizModel from "./option-quiz.js";

const QuizModel = database.define(
  "quiz",
  {
    id_quiz: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    answer: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    fact: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  },
);

QuizModel.hasMany(OptionQuizModel, {
  foreignKey: "id_quiz",
  as: "option",
});

// Satu option dimiliki oleh satu quiz
OptionQuizModel.belongsTo(QuizModel, {
  foreignKey: "id_quiz",
  as: "quiz",
});
export default QuizModel;
