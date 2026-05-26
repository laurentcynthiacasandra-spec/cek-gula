require("dotenv").config();

const express = require("express");
const cors    = require("cors");
const path    = require("path");
const fs      = require("fs");

const authRoutes    = require("./routes/authRoutes");
const gulaRoutes    = require("./routes/gulaRoutes");
const diaryRoutes   = require("./routes/diaryRoutes");
const nutrisiRoutes = require("./routes/nutrisiRoutes");

const app  = express();
const PORT = process.env.PORT || 3000;

// Buat folder uploads jika belum ada
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:5174", "https://cek-gula.vercel.app", "https://cek-gula-mg09s5nui-laurentcynthiacasandra-specs-projects.vercel.app"],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth",    authRoutes);
app.use("/api/gula",    gulaRoutes);
app.use("/api/diary",   diaryRoutes);
app.use("/api/nutrisi", nutrisiRoutes);

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "🍃 Cek-Gula Backend berjalan!" });
});

// 404
app.use((req, res) => {
  res.status(404).json({ status: "error", message: `Route ${req.path} tidak ditemukan.` });
});

app.listen(PORT, () => console.log(`🚀 Server: http://localhost:${PORT}`));
