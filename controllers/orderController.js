const db=require("../db");
const OrderModel=require("../models/orderModel");


const getOrderByUserId= async (req,res) => {
    try{
      const {user_id} =req.params;
      const result=await OrderModel.getOrderByUserId(user_id);
      res.status(200).json({result});
    }catch(err){
      console.error("Order get error:", err);
    res.status(500).json({ message: "Server error" });
    }
};

const addOrderDetails = async (req, res) => {
  try {
    const {
      user_id,
      res_id,
      food_name,
      quantity,
      image,
      total_price,
      p_o_a_id
    } = req.body;

    if (
      !user_id ||
      !res_id ||
      !food_name ||
      !quantity ||
      !total_price ||
      !p_o_a_id
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    if (quantity <= 0 || total_price <= 0) {
      return res.status(400).json({
        message: "Invalid quantity or price"
      });
    }

    const order = await OrderModel.addOrderDetails(req.body);

    res.status(201).json({
      message: "Order placed successfully",
      order
    });

  } catch (err) {
    console.error("Order create error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteOrder = async (req, res) =>{
  try{
    const {order_id} =req.params;
    const result = await OrderModel.deleteOrder(order_id);
    if(result.affectedRows == 0) return res.status(404).json({message:"Order id not found"});
    res.status(200).json({message:"Order Data deleted successful"});
  }catch(err){
    console.log("Order Delete Error:", err);
    res.status(500).json({message:"Server error"});
  }
}

const cancelOrder = async (req, res) => {
  try {
    const { order_id } = req.params;

    const result = await OrderModel.cancelOrder(order_id);

    if (result.affectedRows === 0) {
      return res.status(400).json({
        message: "Order cannot be cancelled"
      });
    }

    res.json({
      message: "Order cancelled successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



module.exports={getOrderByUserId, addOrderDetails,cancelOrder,deleteOrder};