import express from "express";
import { getDetailBySlug } from "../controller/detailController.js";

const DetailRouter = express.Router();

DetailRouter.get("/:slug", getDetailBySlug);

export default DetailRouter;
