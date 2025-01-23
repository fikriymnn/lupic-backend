const router = require('express').Router()

router.use("/",require("./user_routes"))
router.use("/",require("./toko_routes"))
router.use("/",require("./home_routes"))
router.use("/",require("./facility_routes"))
router.use("/",require("./news_routes"))
router.use("/",require("./activity_carousel_routes"))
router.use("/",require("./activity_goals_routes"))
router.use("/",require("./aboutus_routes"))

module.exports = router