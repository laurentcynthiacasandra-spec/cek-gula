# 🍃 Cek-Gula

> **Deteksi Kandungan Gizi dan Prediksi Indeks Glikemik Jajanan Pasar Indonesia**
> Aplikasi web berbasis AI untuk membantu penderita diabetes memantau asupan gula dari jajanan pasar.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-cek--gula.vercel.app-green?style=for-the-badge)](https://cek-gula.vercel.app)
[![AI Model](https://img.shields.io/badge/AI%20Model-GitHub-black?style=for-the-badge)](https://github.com/radhiaauliaa/model-cek-gula)

---

## 📌 Tentang Proyek

Cek-Gula hadir sebagai solusi untuk masalah nyata: Indonesia menempati peringkat ke-5 dunia dengan 19,5 juta penderita diabetes, namun tidak satu pun jajanan pasar memiliki label informasi gizi. Aplikasi ini memungkinkan pengguna memotret jajanan pasar dan langsung mendapatkan informasi kandungan gizinya menggunakan teknologi AI.

### Fitur Utama
- 📸 **AI Scan** — Deteksi jenis jajanan dari foto menggunakan model deep learning (MobileNetV3)
- 📊 **Info Nutrisi** — Kalori, gula, karbohidrat, protein, lemak, Indeks Glikemik, Glycemic Load
- 📔 **Food Diary** — Pantau riwayat konsumsi gula harian
- 🔐 **Autentikasi** — Register & Login dengan JWT

---

## 🤖 Model AI

Model AI dibuat terpisah dan dapat diakses di:
👉 **https://github.com/radhiaauliaa/model-cek-gula**

Model dilatih menggunakan arsitektur MobileNetV3 dengan dataset 50+ jenis jajanan pasar Indonesia dan dideploy ke Hugging Face Spaces.

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|-------|-----------|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | PostgreSQL (Railway) |
| AI Model | TensorFlow, MobileNetV3, Hugging Face |
| Auth | JWT, bcrypt |
| Deploy | Vercel (frontend), Railway (backend) |

---

## 🚀 Cara Menjalankan Proyek

### Prasyarat
- Node.js v18+
- npm
- PostgreSQL

### 1. Clone Repository

    git clone https://github.com/laurentcynthiacasandra-spec/cek-gula.git
    cd cek-gula

### 2. Setup Backend

    cd cek-gula-backend
    npm install
    cp .env.example .env
    node import_nutrisi.js
    npm start

Backend berjalan di: http://localhost:5000

### 3. Setup Frontend

    cd cek-gula-frontend
    npm install
    cp .env.example .env
    npm run dev

Frontend berjalan di: http://localhost:5173

---

## 🔐 Environment Variables

### Backend `cek-gula-backend/.env`

| Variable | Deskripsi |
|----------|-----------|
| DATABASE_URL | Connection string PostgreSQL |
| JWT_SECRET | Secret key untuk JWT |
| PORT | Port server (default 5000) |
| AI_MODEL_URL | URL Hugging Face model |

### Frontend `cek-gula-frontend/.env`

| Variable | Deskripsi |
|----------|-----------|
| VITE_API_URL | URL backend API |

---

## 📡 API Endpoints

| Method | Endpoint | Deskripsi |
|--------|----------|-----------|
| POST | /api/auth/register | Daftar akun baru |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Data user login |
| POST | /api/gula/scan | Upload foto & deteksi |
| GET | /api/gula/history | Riwayat scan |
| GET | /api/nutrisi | Cari data nutrisi |
| GET | /api/diary | Lihat diary hari ini |
| POST | /api/diary | Tambah entri diary |
| DELETE | /api/diary/:id | Hapus entri diary |

---

## 📂 Struktur Folder

    cek-gula/
    ├── cek-gula-backend/
    │   ├── controllers/
    │   ├── routes/
    │   ├── middleware/
    │   ├── services/
    │   ├── db/
    │   ├── uploads/
    │   ├── .env.example
    │   ├── import_nutrisi.js
    │   └── server.js
    ├── cek-gula-frontend/
    │   ├── src/
    │   │   ├── pages/
    │   │   ├── components/
    │   │   └── services/
    │   ├── .env.example
    │   └── vite.config.js
    ├── dataset_nutrisi_lengkap.csv
    └── README.md

---

## 👥 Tim Pengembang

**ID Tim: CC26-PSU007**

| Nama | Role |
|------|------|
| Novandra Wichda Farun | AI Engineer |
| Radhia Aulia Nisa | AI Engineer |
| Joel Wiseda Simanungkalit | Data Scientist |
| Karin Galuh Dea Pramesti | Data Scientist |
| Wulan Pristia Nanda | Full Stack Web Developer |
| Laurent Cynthia Casandra | Full Stack Web Developer |

---

> ⚠️ Aplikasi ini bersifat preventif dan edukatif, bukan pengganti saran medis profesional.