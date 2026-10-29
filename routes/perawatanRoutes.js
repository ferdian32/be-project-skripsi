import express from "express";
import {
  getDataOnePerawatan,
  getDataPerawatan,
  createDataPerawatan,
  updateDataPerawatan,
  deleteDataPerawatan,
} from "../controller/perawatanController.js";

import upload from "../middleware/uploads.js";

const PerawatanRoute = express.Router();

PerawatanRoute.get("/perawatan", getDataPerawatan);
PerawatanRoute.get("/perawatan/:id_perawatan", getDataOnePerawatan);
PerawatanRoute.post("/perawatan", upload.single("image"), createDataPerawatan);
PerawatanRoute.patch(
  "/perawatan/:id_perawatan",
  upload.single("image"),
  updateDataPerawatan,
);
PerawatanRoute.delete("/perawatan/:id_perawatan", deleteDataPerawatan);

export default PerawatanRoute;
