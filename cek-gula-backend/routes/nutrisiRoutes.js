const express        = require("express");
const router         = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { searchNutrisi, getNutrisiById } = require("../controllers/nutrisiController");

router.use(authMiddleware);

router.get("/",    searchNutrisi);
router.get("/:id", getNutrisiById);

module.exports = router;