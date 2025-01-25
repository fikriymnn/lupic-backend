const router = require('express').Router()
const gallery_controller = require('../controllers/gallery_controller')

router.post("/gallery",gallery_controller.create_gallery)
router.get("/gallery",gallery_controller.get_gallery)
router.delete("/gallery/:id",gallery_controller.delete_gallery)

module.exports = router