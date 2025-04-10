const router = require('express').Router()
const user_controller = require('../controllers/admin_user_controller')
const {auth} = require("../middleware/auth")
const User = require("../model/admin_user_model")

router.post("/login",user_controller.login_user)
router.post("/user",async(req,res)=>{
    try{
        await User.create({
            email:"admin@gmail.com",
            password:"dmn123"
        })
        res.send("success")
    }catch(err){
        console.log(err)
        res.send(err.message)
    }
})
router.delete("/user",user_controller.logout_user)
router.get("/user",auth,user_controller.get_user)


module.exports = router