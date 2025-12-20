const express = require("express");
const router = express.Router();
const {
    getFavourites,
    addFavourite,
    deleteFavourite
} = require("../controllers/favouritesController");

router.get("/", getFavourites);
router.post("/", addFavourite);
router.delete("/:fav_id", deleteFavourite);

module.exports = router;
