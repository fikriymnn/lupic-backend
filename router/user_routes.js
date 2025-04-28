const router = require('express').Router()
const user_controller = require('../controllers/user_controller')
const {auth} = require("../middleware/auth")
const User = require("../model/admin_user_model")

router.post("/public/login",user_controller.login_user)
router.post("/public/user",user_controller.register_user)
router.delete("/public/user",user_controller.logout_user)
router.get("/public/user",auth,user_controller.get_user)


module.exports = router