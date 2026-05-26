const express        = require("express");
const router         = express.Router();
const multer         = require("multer");
const path           = require("path");
const authMiddleware = require("../middleware/authMiddleware");
const { getAllGula, createGula, getDashboard, deleteGula } = require("../controllers/gulaController");

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename:    (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = /jpeg|jpg|png|webp/.test(path.extname(file.originalname).toLowerCase());
    cb(null, ok);
  },
});

router.use(authMiddleware);

router.get("/dashboard", getDashboard);       // HARUS di atas "/"
router.get("/",          getAllGula);
router.post("/",         upload.single("image"), createGula);
router.delete("/:id",    deleteGula);

module.exports = router;