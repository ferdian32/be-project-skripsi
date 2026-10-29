import express from "express";
import {
  getDataHabitat,
  getDataOneHabitat,
  createDataHabitat,
  updateDataHabitat,
  deleteDataHabitat,
} from "../controller/habitatController.js";

import upload from "../middleware/uploads.js";

const HabitatRoute = express.Router();

HabitatRoute.get("/habitat", getDataHabitat);
HabitatRoute.get("/habitat/:id_habitat", getDataOneHabitat);
HabitatRoute.post("/habitat", upload.single("image"), createDataHabitat);
HabitatRoute.patch(
  "/habitat/:id_habitat",
  upload.single("image"),
  updateDataHabitat,
);
HabitatRoute.delete("/habitat/:id_habitat", deleteDataHabitat);

export default HabitatRoute;
