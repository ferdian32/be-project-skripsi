import fs from "fs";
import path from "path";
import ArticleModel from "../model/article.js";

// Mengambil semua data quiz
export const getDataArticle = async (req, res) => {
  try {
    const response = await ArticleModel.findAll();

    res.status(200).json({
      message: "Berhasil mengambil data artikel",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data artikel",
    });
  }
};
export const getDataOneArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const response = await ArticleModel.findOne({
      where: {
        id_article,
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil data artikel",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data artikel",
    });
  }
};
export const createDataArticle = async (req, res) => {
  try {
    const { title, konten, category } = req.body;

    if (!title || !konten) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "title,konten, dan category wajib diisi",
      });
    }

    const response = await ArticleModel.create({
      title,
      konten,
      category,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Berhasil menambahkan data artikel",
      data: response,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan data artikel",
    });
  }
};

// Mengubah data quiz beserta gambar
export const updateDataArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const { title, konten, category } = req.body;

    const article = await ArticleModel.findByPk(id_article);

    if (!article) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data Article tidak ditemukan",
      });
    }

    const oldImage = article.image;

    await article.update({
      title,
      konten,
      category,
      ...(req.file && { image: req.file.filename }),
    });

    // Hapus gambar lama jika gambar baru berhasil disimpan
    if (req.file && oldImage) {
      const oldPath = path.join("uploads", oldImage);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
      }
    }

    res.status(200).json({
      message: "Berhasil mengubah data artikel",
      data: article,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal mengubah data artikel",
    });
  }
};

// Menghapus data quiz beserta gambarnya
export const deleteDataArticle = async (req, res) => {
  try {
    const { id_article } = req.params;
    const article = await ArticleModel.findByPk(id_article);

    if (!article) {
      return res.status(404).json({
        message: "Data artikel tidak ditemukan",
      });
    }

    const oldImage = article.image;

    await article.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data artikel",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data artikel",
    });
  }
};
