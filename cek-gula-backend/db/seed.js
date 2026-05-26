const fs   = require("fs");
const path = require("path");
const pool = require("../config/db");
require("dotenv").config();

function parseCSV(filePath) {
  const text    = fs.readFileSync(filePath, "utf-8");
  const lines   = text.trim().split("\n");
  const headers = lines[0].split(",").map(h => h.trim().replace(/\r/g, ""));
  return lines.slice(1).map(line => {
    const vals = line.split(",").map(v => v.trim().replace(/\r/g, ""));
    const row  = {};
    headers.forEach((h, i) => (row[h] = vals[i]));
    return row;
  });
}

async function seed() {
  // Letakkan CSV satu folder di atas backend
  const csvPath = path.join(__dirname, "../../dataset_nutrisi_lengkap.csv");

  if (!fs.existsSync(csvPath)) {
    console.error("❌ File CSV tidak ditemukan di:", csvPath);
    process.exit(1);
  }

  const rows   = parseCSV(csvPath);
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query("TRUNCATE TABLE nutrisi RESTART IDENTITY CASCADE");

    for (const row of rows) {
      await client.query(
        `INSERT INTO nutrisi
           (nama_makanan, kalori_kkal, lemak_g, karbohidrat_g,
            protein_g, gula_g, estimasi_indeks_glikemik, estimasi_glycemic_load)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
        [
          row.nama_makanan,
          parseFloat(row.kalori_kkal)            || 0,
          parseFloat(row.lemak_g)                || 0,
          parseFloat(row.karbohidrat_g)          || 0,
          parseFloat(row.protein_g)              || 0,
          parseFloat(row.gula_g)                 || 0,
          parseInt(row.estimasi_indeks_glikemik) || 0,
          parseFloat(row.estimasi_glycemic_load) || 0,
        ]
      );
    }

    await client.query("COMMIT");
    console.log(`✅ ${rows.length} data nutrisi berhasil dimasukkan!`);
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("❌ Seed gagal:", err.message);
  } finally {
    client.release();
    pool.end();
  }
}

seed();