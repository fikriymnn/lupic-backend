const router = require('express').Router()
const video_controller = require('../controllers/video_controller')

router.post("/video",video_controller.create_video)
router.get("/video",video_controller.get_video)
router.delete("/video/:id",video_controller.delete_video)

module.exports = router