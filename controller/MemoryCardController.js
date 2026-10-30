import MemoryCardModel from "../model/memoryCard.js";

// GET: Mengambil semua data memory card
export const getDataMemoryCard = async (req, res) => {
  try {
    const response = await MemoryCardModel.findAll();

    return res.status(200).json({
      message: "Berhasil mengambil data memory card",
      data: response,
    });
  } catch (error) {
    console.error("Error getDataMemoryCard:", error);

    return res.status(500).json({
      message: "Gagal mengambil data memory card",
    });
  }
};

// GET BY ID: Mengambil satu data berdasarkan id_card
export const getOneDataMemoryCardModel = async (req, res) => {
  try {
    const { id_card } = req.params;

    const response = await MemoryCardModel.findByPk(id_card);

    if (!response) {
      return res.status(404).json({
        message: "Data memory card tidak ditemukan",
      });
    }

    return res.status(200).json({
      message: "Berhasil mengambil data memory card",
      data: response,
    });
  } catch (error) {
    console.error("Error getOneDataMemoryCardModel:", error);

    return res.status(500).json({
      message: "Gagal mengambil data memory card",
    });
  }
};

// CREATE: Menambahkan data memory card
export const createDataMemoryCardModel = async (req, res) => {
  try {
    const { name, emoji } = req.body;

    if (!name || !emoji) {
      return res.status(400).json({
        message: "Nama dan emoji wajib diisi",
      });
    }

    const response = await MemoryCardModel.create({
      name,
      emoji,
    });

    return res.status(201).json({
      message: "Berhasil menambahkan data memory card",
      data: response,
    });
  } catch (error) {
    console.error("Error createDataMemoryCardModel:", error);

    return res.status(500).json({
      message: "Gagal menambahkan data memory card",
    });
  }
};

// UPDATE: Mengubah data memory card berdasarkan id_card
export const updateDataMemoryCardModel = async (req, res) => {
  try {
    const { id_card } = req.params;
    const { name, emoji } = req.body;

    const response = await MemoryCardModel.findByPk(id_card);

    if (!response) {
      return res.status(404).json({
        message: "Data memory card tidak ditemukan",
      });
    }

    await response.update({
      ...(name !== undefined && { name }),
      ...(emoji !== undefined && { emoji }),
    });

    return res.status(200).json({
      message: "Berhasil mengubah data memory card",
      data: response,
    });
  } catch (error) {
    console.error("Error updateDataMemoryCardModel:", error);

    return res.status(500).json({
      message: "Gagal mengubah data memory card",
    });
  }
};

// DELETE: Menghapus data memory card berdasarkan id_card
export const deleteDataMemoryCardModel = async (req, res) => {
  try {
    const { id_card } = req.params;

    const response = await MemoryCardModel.findByPk(id_card);

    if (!response) {
      return res.status(404).json({
        message: "Data memory card tidak ditemukan",
      });
    }

    await response.destroy();

    return res.status(200).json({
      message: "Berhasil menghapus data memory card",
      data: response,
    });
  } catch (error) {
    console.error("Error deleteDataMemoryCardModel:", error);

    return res.status(500).json({
      message: "Gagal menghapus data memory card",
    });
  }
};
