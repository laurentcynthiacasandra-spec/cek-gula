const { Pool } = require('pg');
const fs = require('fs');
const pool = new Pool({ connectionString: 'postgresql://postgres:wHMYdjwHBoYiYKbGYioIgTBIHDDSerju@zephyr.proxy.rlwy.net:21723/railway' });

const lines = fs.readFileSync('../dataset_nutrisi_lengkap.csv', 'utf8').split('\n');
lines.shift();

const inserts = lines.filter(l => l.trim()).map(line => {
  const cols = line.split(',');
  return pool.query(
    'INSERT INTO nutrisi (nama_makanan, kalori_kkal, lemak_g, karbohidrat_g, protein_g, gula_g, estimasi_indeks_glikemik, estimasi_glycemic_load) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)',
    [cols[0], cols[1], cols[2], cols[3], cols[4], cols[5], cols[6], parseFloat(cols[7])]
  );
});

Promise.all(inserts).then(() => { console.log('Import selesai! Total:', inserts.length); pool.end(); }).catch(e => { console.error(e.message); pool.end(); });