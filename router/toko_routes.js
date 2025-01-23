const router = require('express').Router()
const toko_controller = require('../controllers/toko_controller')

router.post("/toko",toko_controller.create_toko)
router.get("/toko/:id?",toko_controller.get_toko)
router.delete("/toko/:id?",toko_controller.delete_toko)
router.put("/toko/:id",toko_controller.update_toko)

module.exports = router