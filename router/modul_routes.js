const router = require('express').Router()
const modul_controller = require('../controllers/modul_controller')

router.post("/modul",modul_controller.create_modul)
router.get("/modul",modul_controller.get_modul)
router.delete("/modul/:id",modul_controller.delete_modul)

module.exports = router