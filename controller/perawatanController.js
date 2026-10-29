import fs from "fs";
import path from "path";
import PerawatanModel from "../model/perawatan.js";

// Mengambil semua data quiz
export const getDataPerawatan = async (req, res) => {
  try {
    const response = await PerawatanModel.findAll();

    res.status(200).json({
      message: "Berhasil mengambil data perawatan",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data perawatan",
    });
  }
};
export const getDataOnePerawatan = async (req, res) => {
  try {
    const { id_perawatan } = req.params;
    const response = await PerawatanModel.findOne({
      where: {
        id_perawatan,
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil data perawatan",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data perawatan",
    });
  }
};
export const createDataPerawatan = async (req, res) => {
  try {
    const { title, konten, category } = req.body;

    if (!title || !konten) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "title,konten, dan category wajib diisi",
      });
    }

    const response = await PerawatanModel.create({
      title,
      konten,
      category,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Berhasil menambahkan data perawatan",
      data: response,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan data perawatan",
    });
  }
};

// Mengubah data quiz beserta gambar
export const updateDataPerawatan = async (req, res) => {
  try {
    const { id_perawatan } = req.params;
    const { title, konten, category } = req.body;

    const perawatan = await PerawatanModel.findByPk(id_perawatan);

    if (!perawatan) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data perawatan tidak ditemukan",
      });
    }

    const oldImage = perawatan.image;

    await perawatan.update({
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
      message: "Berhasil mengubah data perawatan",
      data: perawatan,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal mengubah data perawatan",
    });
  }
};

export const deleteDataPerawatan = async (req, res) => {
  try {
    const { id_perawatan } = req.params;
    const perawatan = await PerawatanModel.findByPk(id_perawatan);

    if (!perawatan) {
      return res.status(404).json({
        message: "Data perawatan tidak ditemukan",
      });
    }

    const oldImage = perawatan.image;

    await perawatan.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data perawatan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data perawatan",
    });
  }
};
