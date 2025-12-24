const express =require("express");
const router= express.Router();
const {getOrderByUserId,addOrderDetails,deleteOrder,cancelOrder}=require("../controllers/orderController");

router.get("/user/:user_id", getOrderByUserId);
router.post("/add", addOrderDetails);
router.put("/cancel/:order_id", cancelOrder);
router.delete("/delete/:order_id", deleteOrder);


module.exports=router;