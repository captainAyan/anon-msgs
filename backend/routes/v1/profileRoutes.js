const express = require("express");

const router = express.Router();
const {
  getProfile,
  editProfile,
  deleteProfile,
} = require("../../controllers/profileController");
const { protect } = require("../../middleware/authMiddleware");

router.get("/:username", getProfile);
router.put("/", protect, editProfile);
router.delete("/", protect, deleteProfile);

module.exports = router;
