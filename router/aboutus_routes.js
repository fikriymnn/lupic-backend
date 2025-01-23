const router = require('express').Router()
const aboutus_controller = require('../controllers/aboutus_controller')

router.post("/aboutus",aboutus_controller.create_aboutus)
router.get("/aboutus",aboutus_controller.get_aboutus)
router.put("/aboutus/:id",aboutus_controller.update_aboutus)

module.exports = router