const express        = require("express");
const router         = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const { getDiary, addDiary, deleteDiary } = require("../controllers/diaryController");

router.use(authMiddleware);

router.get("/",       getDiary);
router.post("/",      addDiary);
router.delete("/:id", deleteDiary);

module.exports = router;