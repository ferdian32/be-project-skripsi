import SpesiesModel from "../model/spesies.js";
import PerawatanModel from "../model/perawatan.js";
import PendidikanModel from "../model/pendidikan.js";
import HabitatModel from "../model/habitat.js";
import ArticleModel from "../model/article.js";

const models = [
  { model: SpesiesModel, type: "spesies" },
  { model: PerawatanModel, type: "perawatan" },
  { model: PendidikanModel, type: "pendidikan" },
  { model: HabitatModel, type: "habitat" },
  { model: ArticleModel, type: "article" },
];

const createSlug = (title) =>
  title
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

export const getDetailBySlug = async (req, res) => {
  try {
    const { slug } = req.params;

    for (const item of models) {
      const data = await item.model.findAll();

      const found = data.find(
        (record) => createSlug(record.title) === slug,
      );

      if (found) {
        return res.status(200).json({
          success: true,
          type: item.type,
          data: found,
        });
      }
    }

    return res.status(404).json({
      success: false,
      message: "Data tidak ditemukan",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Gagal mengambil detail",
    });
  }
};