import fs from "fs";
import path from "path";
import PendidikanModel from "../model/pendidikan.js";

// Mengambil semua data quiz
export const getDataPendidikan = async (req, res) => {
  try {
    const response = await PendidikanModel.findAll();

    res.status(200).json({
      message: "Berhasil mengambil data Pendidikan",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data pendidikan",
    });
  }
};
export const getDataOnePendidikan = async (req, res) => {
  try {
    const { id_pendidikan } = req.params;
    const response = await PendidikanModel.findOne({
      where: {
        id_pendidikan,
      },
    });

    res.status(200).json({
      message: "Berhasil mengambil data pendidikan",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data pendidikan",
    });
  }
};
export const createDataPendidikan = async (req, res) => {
  try {
    const { title, konten, category } = req.body;

    if (!title || !konten) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "title,konten, dan category wajib diisi",
      });
    }

    const response = await PendidikanModel.create({
      title,
      konten,
      category,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Berhasil menambahkan data pendidikan",
      data: response,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan data pendidikan",
    });
  }
};

export const updateDataPendidikan = async (req, res) => {
  try {
    const { id_pendidikan } = req.params;
    const { title, konten, category } = req.body;

    const pendidikan = await PendidikanModel.findByPk(id_pendidikan);

    if (!pendidikan) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data pendidikan tidak ditemukan",
      });
    }

    const oldImage = pendidikan.image;

    await pendidikan.update({
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
      message: "Berhasil mengubah data pendidikan",
      data: pendidikan,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal mengubah data pendidikan",
    });
  }
};

// Menghapus data quiz beserta gambarnya
export const deleteDataPendidikan = async (req, res) => {
  try {
    const { id_pendidikan } = req.params;
    const pendidikan = await PendidikanModel.findByPk(id_pendidikan);

    if (!pendidikan) {
      return res.status(404).json({
        message: "Data pendidikan tidak ditemukan",
      });
    }

    const oldImage = pendidikan.image;

    await pendidikan.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data pendidikan",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data pendidikan",
    });
  }
};
