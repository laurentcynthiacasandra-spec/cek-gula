const pool = require("../config/db");
const { analyzeGula, getRekomendasi, estimateKadarGula } = require("../services/aiService");

// GET /api/gula
const getAllGula = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT id, nama_makanan AS nama, kadar_gula AS "kadarGula",
              status, kalori, image_url, nutrisi_detail, created_at
       FROM scan_results
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [req.user.id]
    );
    res.json({ status: "success", totalData: result.rows.length, data: result.rows });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// POST /api/gula
const createGula = async (req, res) => {
  try {
    const { nama, kadarGula } = req.body;

    if (!nama || kadarGula === undefined)
      return res.status(400).json({ status: "error", message: "Nama dan kadar gula wajib diisi." });

    const status      = analyzeGula(Number(kadarGula));
    const rekomendasi = getRekomendasi(status, nama);

    // Cari nutrisi dari dataset
    const nutrisiRow = await pool.query(
      "SELECT * FROM nutrisi WHERE LOWER(nama_makanan) = LOWER($1) LIMIT 1",
      [nama]
    );

    let kalori        = null;
    let nutrisiDetail = { rekomendasi };

    if (nutrisiRow.rows.length > 0) {
      const n       = nutrisiRow.rows[0];
      kalori        = n.kalori_kkal;
      nutrisiDetail = {
        kalori_kkal: n.kalori_kkal,
        lemak_g: n.lemak_g,
        karbohidrat_g: n.karbohidrat_g,
        protein_g: n.protein_g,
        gula_g: n.gula_g,
        estimasi_indeks_glikemik: n.estimasi_indeks_glikemik,
        estimasi_glycemic_load: n.estimasi_glycemic_load,
        rekomendasi,
      };
    }

    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const result = await pool.query(
      `INSERT INTO scan_results
         (user_id, nama_makanan, kadar_gula, status, kalori, image_url, nutrisi_detail)
       VALUES ($1,$2,$3,$4,$5,$6,$7)
       RETURNING *`,
      [req.user.id, nama, Number(kadarGula), status, kalori, imageUrl, JSON.stringify(nutrisiDetail)]
    );

    const saved = result.rows[0];
    res.status(201).json({
      status: "success",
      message: "Data berhasil disimpan.",
      result: {
        id: saved.id,
        nama: saved.nama_makanan,
        kadarGula: saved.kadar_gula,
        status: saved.status,
        kalori: saved.kalori,
        nutrisiDetail: saved.nutrisi_detail,
        createdAt: saved.created_at,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: err.message });
  }
};

// GET /api/gula/dashboard
const getDashboard = async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         COUNT(*)                                       AS total,
         COUNT(*) FILTER (WHERE status = 'Normal')     AS normal,
         COUNT(*) FILTER (WHERE status = 'Tinggi')     AS tinggi,
         COUNT(*) FILTER (WHERE status = 'Rendah')     AS rendah,
         ROUND(AVG(kadar_gula)::numeric, 1)            AS rata_rata_gula,
         ROUND(SUM(kalori)::numeric, 1)                AS total_kalori
       FROM scan_results
       WHERE user_id = $1`,
      [req.user.id]
    );

    const s = result.rows[0];
    res.json({
      status: "success",
      data: {
        total:       parseInt(s.total),
        normal:      parseInt(s.normal),
        tinggi:      parseInt(s.tinggi),
        rendah:      parseInt(s.rendah),
        rataRataGula: s.rata_rata_gula || "0.0",
        totalKalori:  s.total_kalori   || "0.0",
      },
    });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

// DELETE /api/gula/:id
const deleteGula = async (req, res) => {
  try {
    const result = await pool.query(
      "DELETE FROM scan_results WHERE id = $1 AND user_id = $2 RETURNING id",
      [req.params.id, req.user.id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ status: "error", message: "Data tidak ditemukan." });

    res.json({ status: "success", message: "Data berhasil dihapus." });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

module.exports = { getAllGula, createGula, getDashboard, deleteGula };