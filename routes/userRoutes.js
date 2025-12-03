const express = require("express");
const {upload} = require("../middleware/upload");
const { getAllUsers,updateUser,patchUser } = require("../controllers/userControllers");

const router = express.Router();

router.get("/", getAllUsers);
router.put("/update/:id", upload.single("user_pic"), updateUser);
router.patch("/patch/:id", upload.single("user_pic"), patchUser);


module.exports = router;
