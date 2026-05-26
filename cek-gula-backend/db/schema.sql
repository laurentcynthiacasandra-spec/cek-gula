-- Tabel users
CREATE TABLE IF NOT EXISTS users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100)        NOT NULL,
  email      VARCHAR(150) UNIQUE NOT NULL,
  password   VARCHAR(255)        NOT NULL,
  created_at TIMESTAMP           DEFAULT NOW()
);

-- Tabel dataset nutrisi (diisi dari CSV)
CREATE TABLE IF NOT EXISTS nutrisi (
  id                       SERIAL PRIMARY KEY,
  nama_makanan             VARCHAR(100),
  kalori_kkal              DECIMAL(8,2),
  lemak_g                  DECIMAL(8,2),
  karbohidrat_g            DECIMAL(8,2),
  protein_g                DECIMAL(8,2),
  gula_g                   DECIMAL(8,2),
  estimasi_indeks_glikemik INTEGER,
  estimasi_glycemic_load   DECIMAL(8,2)
);

-- Tabel hasil scan makanan
CREATE TABLE IF NOT EXISTS scan_results (
  id             SERIAL PRIMARY KEY,
  user_id        INTEGER      REFERENCES users(id) ON DELETE CASCADE,
  nama_makanan   VARCHAR(100) NOT NULL,
  kadar_gula     DECIMAL(8,2),
  status         VARCHAR(20),
  kalori         DECIMAL(8,2),
  image_url      VARCHAR(255),
  nutrisi_detail JSONB,
  created_at     TIMESTAMP    DEFAULT NOW()
);

-- Tabel food diary harian
CREATE TABLE IF NOT EXISTS food_diary (
  id           SERIAL PRIMARY KEY,
  user_id      INTEGER      REFERENCES users(id) ON DELETE CASCADE,
  scan_id      INTEGER      REFERENCES scan_results(id) ON DELETE SET NULL,
  nama_makanan VARCHAR(100) NOT NULL,
  kadar_gula   DECIMAL(8,2),
  kalori       DECIMAL(8,2),
  status       VARCHAR(20),
  time_eaten   TIME,
  diary_date   DATE         DEFAULT CURRENT_DATE,
  created_at   TIMESTAMP    DEFAULT NOW()
);

-- Index untuk performa
CREATE INDEX IF NOT EXISTS idx_scan_user    ON scan_results(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_user   ON food_diary(user_id);
CREATE INDEX IF NOT EXISTS idx_diary_date   ON food_diary(diary_date);
CREATE INDEX IF NOT EXISTS idx_nutrisi_nama ON nutrisi(nama_makanan);