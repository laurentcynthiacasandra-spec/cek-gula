const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host:     process.env.DB_HOST     || "localhost",
  port:     process.env.DB_PORT     || 5432,
  user:     process.env.DB_USER     || "postgres",
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME     || "cek_gula_db",
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Gagal konek ke PostgreSQL:", err.message);
    return;
  }
  console.log("✅ PostgreSQL terhubung!");
  release();
});

module.exports = pool;