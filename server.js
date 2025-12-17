require("dotenv").config(); // ✅ ALWAYS FIRST

const express = require("express");
const authMiddleware = require("./middleware/authMiddleware");

const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const addressRoutes = require("./routes/addRoutes");
const otpRoutes = require("./routes/otpRoutes");
const phoneOtpRoutes = require("./routes/phoneOtp");
const imageRoutes = require("./routes/onlyImageRoutes");
const foodRoutes = require("./routes/foodRoutes");
const restaurantRoutes = require("./routes/restaurantRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const placeOrderRoutes = require("./routes/placeorderAddressRoutes");
const ordersRoutes = require("./routes/orderRoutes");
const favouritesRoutes = require("./routes/favouritesRoutes");

const db = require("./db");

const app = express();
const PORT = process.env.PORT || 3000;

// ===== Middlewares =====
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));

// ===== Routes =====
app.use("/auth", authRoutes);
app.use("/phone", phoneOtpRoutes);
app.use("/users", userRoutes);
app.use("/address", addressRoutes);
app.use("/otp", otpRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/image_add", imageRoutes);
app.use("/food", foodRoutes);
app.use("/payment", paymentRoutes);
app.use("/favourites", authMiddleware, favouritesRoutes);
app.use("/place", placeOrderRoutes);
app.use("/order", ordersRoutes);

// ===== Utility APIs =====
app.get("/getTablesWithColumns", async (req, res) => {
    try {
        const [tables] = await db.query(`SHOW TABLES`);
        const key = Object.keys(tables[0])[0];
        const result = [];

        for (let table of tables) {
            const tableName = table[key];
            const [columns] = await db.query(
                `SELECT COLUMN_NAME, DATA_TYPE, COLUMN_KEY, IS_NULLABLE
         FROM information_schema.columns
         WHERE table_schema = DATABASE()
         AND table_name = ?`,
                [tableName]
            );

            result.push({ tableName, columns });
        }

        res.json({ message: "Tables with columns", data: result });
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
});

// ===== START SERVER (ONLY ONCE) =====
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log("✅ JWT_SECRET:", process.env.JWT_SECRET);
});
