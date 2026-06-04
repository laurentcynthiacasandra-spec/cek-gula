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
```bash