import express from "express";
import {
  getDataOnePendidikan,
  getDataPendidikan,
  createDataPendidikan,
  updateDataPendidikan,
  deleteDataPendidikan,
} from "../controller/pendidikanController.js";

import upload from "../middleware/uploads.js";

const PendidikanRoute = express.Router();

PendidikanRoute.get("/pendidikan", getDataPendidikan);
PendidikanRoute.get("/pendidikan/:id_pendidikan", getDataOnePendidikan);
PendidikanRoute.post(
  "/pendidikan",
  upload.single("image"),
  createDataPendidikan,
);
PendidikanRoute.patch(
  "/pendidikan/:id_pendidikan",
  upload.single("image"),
  updateDataPendidikan,
);
PendidikanRoute.delete("/pendidikan/:id_pendidikan", deleteDataPendidikan);

export default PendidikanRoute;
