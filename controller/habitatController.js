import fs from "fs";
import path from "path";
import HabitatModel from "../model/habitat.js";

// Mengambil semua data quiz
export const getDataHabitat = async (req, res) => {
  try {
    const response = await HabitatModel.findAll();

    res.status(200).json({
      message: "Berhasil mengambil data habitat",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data habitat",
    });
  }
};
export const getDataOneHabitat = async (req, res) => {
  try {
    const { id_habitat } = req.params;
    const response = await HabitatModel.findOne({
      where: {
        id_habitat,
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil data habitat",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data habitat",
    });
  }
};
export const createDataHabitat = async (req, res) => {
  try {
    const { title, konten, category } = req.body;

    if (!title || !konten) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "title,konten, dan category wajib diisi",
      });
    }

    const response = await HabitatModel.create({
      title,
      konten,
      category,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Berhasil menambahkan data habitat",
      data: response,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan data habitat",
    });
  }
};

// Mengubah data quiz beserta gambar
export const updateDataHabitat = async (req, res) => {
  try {
    const { id_habitat } = req.params;
    const { title, konten, category } = req.body;

    const habitat = await HabitatModel.findByPk(id_habitat);

    if (!habitat) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data habitat tidak ditemukan",
      });
    }

    const oldImage = habitat.image;

    await habitat.update({
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
      message: "Berhasil mengubah data habitat",
      data: habitat,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal mengubah data habitat",
    });
  }
};

// Menghapus data quiz beserta gambarnya
export const deleteDataHabitat = async (req, res) => {
  try {
    const { id_habitat } = req.params;
    const habitat = await HabitatModel.findByPk(id_habitat);

    if (!habitat) {
      return res.status(404).json({
        message: "Data habitat tidak ditemukan",
      });
    }

    const oldImage = habitat.image;

    await habitat.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data habitat",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data habitat",
    });
  }
};
