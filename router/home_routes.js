const router = require('express').Router()
const home_controller = require('../controllers/home_controller')

router.post("/home",home_controller.create_home)
router.get("/home",home_controller.get_home)
router.put("/home/:id",home_controller.update_home)

module.exports = router