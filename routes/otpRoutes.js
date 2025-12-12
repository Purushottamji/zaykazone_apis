const express=require("express");
const {sendOtp, verifyOtp,sendOtpChange,verifyOtpChange,updateUser} =require("../controllers/otpControllers");
const {authMiddleware}=require("../middleware/authMiddleware");
const {upload}=require("../middleware/upload");

const router=express.Router();
router.post("/send-otp",sendOtp);

router.put(
  "/update-profile",
  authMiddleware,    // Verify JWT
  upload.single("user_pic"), // multer
 updateUser
);
router.post("/verify-otp",verifyOtp);
router.put("/change-number/send-otp",authMiddleware, sendOtpChange);
router.post("/change-number/verify-otp",authMiddleware, verifyOtpChange);

module.exports=router;