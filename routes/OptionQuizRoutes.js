import express from "express";
import {
  getDataOption,
  deleteDataOption,
  updateDataOption,
  createDataOption,
} from "../controller/optionQuizController.js";

const optionQuizRouter = express.Router();

optionQuizRouter.get("/option-quiz", getDataOption);
optionQuizRouter.post("/option-quiz", createDataOption);
optionQuizRouter.put("/option-quiz/:id", updateDataOption);
optionQuizRouter.delete("/option-quiz/:id", deleteDataOption);

export default optionQuizRouter;
