import express from "express";
import {
  getDataOneSpesies,
  getDataSpesies,
  createDataSpesies,
  updateDataSpesies,
  deleteDataSpesies,
} from "../controller/spesiesController.js";

import upload from "../middleware/uploads.js";

const SpesiesRoute = express.Router();

SpesiesRoute.get("/spesies", getDataSpesies);
SpesiesRoute.get("/spesies/:id_spesies", getDataOneSpesies);
SpesiesRoute.post("/spesies", upload.single("image"), createDataSpesies);
SpesiesRoute.patch(
  "/spesies/:id_spesies",
  upload.single("image"),
  updateDataSpesies,
);
SpesiesRoute.delete("/spesies/:id_spesies", deleteDataSpesies);

export default SpesiesRoute;
