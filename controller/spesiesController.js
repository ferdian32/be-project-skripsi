import fs from "fs";
import path from "path";
import SpesiesModel from "../model/spesies.js";

export const getDataSpesies = async (req, res) => {
  try {
    const response = await SpesiesModel.findAll();

    res.status(200).json({
      message: "Berhasil mengambil data spesies",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data spesies",
    });
  }
};
export const getDataOneSpesies = async (req, res) => {
  try {
    const { id_spesies } = req.params;
    const response = await SpesiesModel.findOne({
      where: {
        id_spesies,
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil data spesies",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data artikel",
    });
  }
};
export const createDataSpesies = async (req, res) => {
  try {
    const { title, konten, category } = req.body;

    if (!title || !konten) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "title,konten, dan category wajib diisi",
      });
    }

    const response = await SpesiesModel.create({
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

// Mengubah data spesies beserta gambar
export const updateDataSpesies = async (req, res) => {
  try {
    const { id_spesies } = req.params;
    const { title, konten, category } = req.body;

    const spesies = await SpesiesModel.findByPk(id_spesies);

    if (!spesies) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data spesies tidak ditemukan",
      });
    }

    const oldImage = spesies.image;

    await spesies.update({
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
      message: "Berhasil mengubah data spesies",
      data: spesies,
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
export const deleteDataSpesies = async (req, res) => {
  try {
    const { id_spesies } = req.params;
    const spesies = await SpesiesModel.findByPk(id_spesies);

    if (!spesies) {
      return res.status(404).json({
        message: "Data artikel tidak ditemukan",
      });
    }

    const oldImage = spesies.image;

    await spesies.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data spesies",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data spesies",
    });
  }
};
