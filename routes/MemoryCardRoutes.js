import express from "express";
import {
  getDataMemoryCard,
  getOneDataMemoryCardModel,
  updateDataMemoryCardModel,
  createDataMemoryCardModel,
  deleteDataMemoryCardModel,
} from "../controller/MemoryCardController.js";


const MemoryCardRouter = express.Router();

MemoryCardRouter.get("/memory-card", getDataMemoryCard);
MemoryCardRouter.get("/memory-card/:id_card", getOneDataMemoryCardModel);
MemoryCardRouter.post("/memory-card", createDataMemoryCardModel);
MemoryCardRouter.patch("/memory-card/:id_card", updateDataMemoryCardModel);
MemoryCardRouter.delete("/memory-card/:id_card", deleteDataMemoryCardModel);

export default MemoryCardRouter;
