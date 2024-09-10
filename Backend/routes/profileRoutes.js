const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const {
  getProfile,
  updateProfile,
  uploadProfileImage,
} = require("../controllers/profileController");
const auth = require("../middleware/auth");

router.get("/", auth, getProfile);
router.put("/", auth, updateProfile);

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.post("/upload", auth, upload.single("profileImage"), uploadProfileImage);

module.exports = router;
