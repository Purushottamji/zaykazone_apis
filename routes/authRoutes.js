const express = require("express");
const upload = require("../middleware/upload");
const { registerUser, loginUser } = require("../controllers/authControllers");

const router = express.Router();


router.post("/register", upload.single("user_pic"), registerUser);

router.post("/login", loginUser);

module.exports = router;
