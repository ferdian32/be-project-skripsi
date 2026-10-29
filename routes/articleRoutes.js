import express from "express";
import {
  getDataArticle,
  getDataOneArticle,
  deleteDataArticle,
  createDataArticle,
  updateDataArticle,
} from "../controller/articleController.js";

import upload from "../middleware/uploads.js";

const ArticleRoute = express.Router();

ArticleRoute.get("/article", getDataArticle);
ArticleRoute.get("/article/:id_article", getDataOneArticle);
ArticleRoute.post("/article", upload.single("image"), createDataArticle);
ArticleRoute.patch(
  "/article/:id_article",
  upload.single("image"),
  updateDataArticle,
);
ArticleRoute.delete("/article/:id_article", deleteDataArticle);

export default ArticleRoute;
