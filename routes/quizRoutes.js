import express from "express";
import {
  getDataQuiz,
  createDataQuiz,
  deleteDataQuiz,
  updateDataQuiz,
  getDataOneQuiz,
} from "../controller/quizController.js";

import upload from "../middleware/uploads.js";

const QuizRouter = express.Router();

QuizRouter.get("/quiz", getDataQuiz);
QuizRouter.get("/quiz/:id_quiz", getDataOneQuiz);
QuizRouter.post("/quiz", upload.single("image"), createDataQuiz);
QuizRouter.patch("/quiz/:id_quiz", upload.single("image"), updateDataQuiz);
QuizRouter.delete("/quiz/:id_quiz", deleteDataQuiz);

export default QuizRouter;
