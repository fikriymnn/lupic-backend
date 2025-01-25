const router = require('express').Router()
const activity_carousel_controller = require('../controllers/activity_carousel_controller')

router.post("/activity_carousel",activity_carousel_controller.create_activity_carousel)
router.get("/activity_carousel/:id?",activity_carousel_controller.get_activity_carousel)
router.delete("/activity_carousel/:id",activity_carousel_controller.delete_activity_carousel)
router.put("/activity_carousel/:id",activity_carousel_controller.update_activity_carousel)

module.exports = router