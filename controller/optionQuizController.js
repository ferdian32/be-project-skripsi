import OptionQuizModel from "../model/option-quiz.js";

export const getDataOption = async (req, res) => {
  try {
    const response = await OptionQuizModel.findAll();

    return res.status(200).json({
      message: "Berhasil mengambil data option",
      data: response,
    });
  } catch (error) {
    console.error("Error getDataOption:", error);

    return res.status(500).json({
      message: "Gagal mengambil data option",
    });
  }
};

export const createDataOption = async (req, res) => {
  try {
    const { id_quiz, option_text } = req.body;

    if (!id_quiz || !option_text) {
      return res.status(400).json({
        message: "id_quiz dan option_text wajib diisi",
      });
    }

    const response = await OptionQuizModel.create({
      id_quiz,
      option_text,
    });

    return res.status(201).json({
      message: "Berhasil menambahkan option",
      data: response,
    });
  } catch (error) {
    console.error("Error createDataOption:", error);

    return res.status(500).json({
      message: "Gagal menambahkan option",
    });
  }
};

export const updateDataOption = async (req, res) => {
  try {
    const { id } = req.params;
    const { id_quiz, option_text } = req.body;

    const option = await OptionQuizModel.findByPk(id);

    if (!option) {
      return res.status(404).json({
        message: "Data option tidak ditemukan",
      });
    }

    await option.update({
      ...(id_quiz !== undefined && { id_quiz }),
      ...(option_text !== undefined && { option_text }),
    });

    return res.status(200).json({
      message: "Berhasil mengubah data option",
      data: option,
    });
  } catch (error) {
    console.error("Error updateDataOption:", error);

    return res.status(500).json({
      message: "Gagal mengubah data option",
    });
  }
};

export const deleteDataOption = async (req, res) => {
  try {
    const { id } = req.params;

    const option = await OptionQuizModel.findByPk(id);

    if (!option) {
      return res.status(404).json({
        message: "Data option tidak ditemukan",
      });
    }

    await option.destroy();

    return res.status(200).json({
      message: "Berhasil menghapus data option",
    });
  } catch (error) {
    console.error("Error deleteDataOption:", error);

    return res.status(500).json({
      message: "Gagal menghapus data option",
    });
  }
};
