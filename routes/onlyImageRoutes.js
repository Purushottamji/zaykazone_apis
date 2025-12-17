const express=require("express");
const router=express.Router();
const {upload}= require("../middleware/upload");
const {addImage}=require("../controllers/onlyImage");

router.post("/post",upload.array("image"),addImage);

module.exports=router;