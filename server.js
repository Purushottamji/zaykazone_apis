const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addRoutes");
const otpRoutes = require("./routes/otpRoutes");
const phoneOtpRoutes = require("./routes/phoneOtp");
const imageRoutes = require("./routes/onlyImageRoutes");
const foodRoutes= require("./routes/foodRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", authRoutes);
app.use("/phone", phoneOtpRoutes);
app.use("/users", userRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/address", addressRoutes);
app.use("/otp", otpRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/image_add", imageRoutes);
app.use("/food", foodRoutes);
app.use("/payment", paymentRoutes);


// GET favourites for a user
app.get("/favourites/:id", (req, res) => {
    const id = req.params.id;  

    const sql = `
        SELECT f.fevo_id, r.*
        FROM favourites f
        JOIN restaurant_details r ON f.res_id = r.res_id
        WHERE f.id = ?
    `;

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json(err);
        }
        res.json(result);
    });
});


// ADD favourite
app.post("/add-favourite", (req, res) => {
    const { id, res_id } = req.body;


    db.query("SELECT * FROM user_info WHERE id = ?", [id], (err, user) => {
        if (err) return res.status(500).json(err);
        if (!user.length) return res.status(400).json({ error: "User does not exist" });

    
        db.query("SELECT * FROM restaurant_details WHERE res_id = ?", [res_id], (err, rest) => {
            if (err) return res.status(500).json(err);
            if (!rest.length) return res.status(400).json({ error: "Restaurant does not exist" });

        
            const sql = "INSERT INTO favourites (id, res_id) VALUES (?, ?)";
            db.query(sql, [id, res_id], (err, result) => {
                if (err) return res.status(500).json(err);
                res.json({ message: "Added to favourites", favourite_id: result.insertId });
            });
        });
    });
});


// DELETE favourite
app.delete("/favourite/:fevo_id", (req, res) => {
    const fevo_id = req.params.fevo_id;
    const sql = "DELETE FROM favourites WHERE fevo_id = ?";
    db.query(sql, [fevo_id], (err) =>
        err ? res.status(500).json(err) : res.json({ message: "Removed from favourites" })
    );
});

const PORT=process.env.PORT || 3000;
app.listen(PORT,(err)=>{
    if(err) return console.error("server error :"+err.message);
    console.log(`server running on port ${PORT}`);

});

