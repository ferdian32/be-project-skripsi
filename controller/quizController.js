import QuizModel from "../model/quiz.js";
import fs from "fs";
import path from "path";
import OptionQuizModel from "../model/option-quiz.js";

// Mengambil semua data quiz
export const getDataQuiz = async (req, res) => {
  try {
    const response = await QuizModel.findAll({
      include: [
        {
          as: "option",
          model: OptionQuizModel,
        },
      ],
    });

    res.status(200).json({
      message: "Berhasil mengambil data quiz",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data quiz",
    });
  }
};
export const getDataOneQuiz = async (req, res) => {
  try {
    const { id_quiz } = req.params;
    const response = await QuizModel.findOne({
      where: {
        id_quiz,
      },
      include: [
        {
          as: "option",
          model: OptionQuizModel,
        },
      ],
    });

    res.status(200).json({
      message: "Berhasil mengambil data quiz",
      data: response,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal mengambil data quiz",
    });
  }
};

// Menambahkan data quiz beserta gambar
export const createDataQuiz = async (req, res) => {
  try {
    const { question, answer, fact } = req.body;

    if (!question || !answer) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(400).json({
        message: "Question dan answer wajib diisi",
      });
    }

    const response = await QuizModel.create({
      question,
      answer,
      fact,
      image: req.file ? req.file.filename : null,
    });

    res.status(201).json({
      message: "Berhasil menambahkan data quiz",
      data: response,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal menambahkan data quiz",
    });
  }
};

// Mengubah data quiz beserta gambar
export const updateDataQuiz = async (req, res) => {
  try {
    const { id_quiz } = req.params;
    const { question, answer, fact } = req.body;

    const quiz = await QuizModel.findByPk(id_quiz);

    if (!quiz) {
      if (req.file) fs.unlinkSync(req.file.path);

      return res.status(404).json({
        message: "Data quiz tidak ditemukan",
      });
    }

    const oldImage = quiz.image;

    await quiz.update({
      question,
      answer,
      fact,
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
      message: "Berhasil mengubah data quiz",
      data: quiz,
    });
  } catch (error) {
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error(error);
    res.status(500).json({
      message: "Gagal mengubah data quiz",
    });
  }
};

// Menghapus data quiz beserta gambarnya
export const deleteDataQuiz = async (req, res) => {
  try {
    const { id_quiz } = req.params;
    const quiz = await QuizModel.findByPk(id_quiz);

    if (!quiz) {
      return res.status(404).json({
        message: "Data quiz tidak ditemukan",
      });
    }

    const oldImage = quiz.image;

    await quiz.destroy();

    if (oldImage) {
      const imagePath = path.join("uploads", oldImage);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    res.status(200).json({
      message: "Berhasil menghapus data quiz",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Gagal menghapus data quiz",
    });
  }
};
