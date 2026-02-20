const express = require("express");
const { upload, compressImage } = require("../middleware/upload");
const {
  getAllUsers,
  updateUser,
  patchUser,
  deleteUser,
} = require("../controllers/userControllers");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

router.get("/", getAllUsers);
router.put("/update/:id", upload.single("user_pic"), compressImage, updateUser);
router.patch("/patch/:id", upload.single("user_pic"), compressImage, patchUser);
router.delete("/delete/:id", authMiddleware, deleteUser);

module.exports = router;
