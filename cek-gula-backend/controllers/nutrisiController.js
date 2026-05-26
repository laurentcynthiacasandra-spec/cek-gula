const pool = require("../config/db");
const { analyzeGula, estimateKadarGula } = require("../services/aiService");

// GET /api/nutrisi?q=bakwan
const searchNutrisi = async (req, res) => {
  try {
    const q = req.query.q || "";
    if (!q.trim())
      return res.status(400).json({ status: "error", message: "Parameter q wajib diisi." });

    const result = await pool.query(
      `SELECT * FROM nutrisi
       WHERE LOWER(nama_makanan) LIKE LOWER($1)
       ORDER BY nama_makanan LIMIT 20`,
      [`%${q}%`]
    );

    const data = result.rows.map(item => ({
      ...item,
      kadar_gula_estimasi: estimateKadarGula(parseFloat(item.gula_g) || 0),
      status: analyzeGula(estimateKadarGula(parseFloat(item.gula_g) || 0)),
    }));

    res.json({ status: "success", totalData: data.length, data });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// GET /api/nutrisi/:id
const getNutrisiById = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM nutrisi WHERE id = $1", [req.params.id]);
    if (result.rows.length === 0)
      return res.status(404).json({ status: "error", message: "Makanan tidak ditemukan." });

    res.json({ status: "success", data: result.rows[0] });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { searchNutrisi, getNutrisiById };