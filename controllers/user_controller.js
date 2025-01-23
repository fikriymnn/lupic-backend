const User = require("../model/user_model")
const generate_access_token = require("../utils/generate_access_token")

const user_controller = {
    get_user: async (req, res) => {
        try {
            const data = req.user
            if(!data){
               res.status(200).json({
                  success: false,
                  data: "user is not exist"
               })
            }else{
               return res.status(200).json({
                  success: true,
                  data
               })
            }
         } catch (err) {
            return res.status(500).json({
               success: false,
               message: err.message
            })
         }
    },
    logout_user: async (req, res) => {
        try {
            if(!req.cookies.access_token){
                return res.status(200).json({
                   success: false,
                   message: "Logout failed!"
                })
             }
             res.clearCookie('access_token',{ sameSite:'None',
             secure: true,})
    
             return res.status(200).json({
                success: true,
                message: "Logout successfully!"
             })
          } catch (err) {
             return res.status(500).json({
                success: false,
                message: err.message
             })
        }
    },
    login_user: async (req, res) => {
        try {
            if (req.cookies.access_token) {
                return res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Login successfully"
                })
            }
            const { password, email } = req.body
            if (!password && !email) {
                return res.status(200).json({
                    status: 400,
                    success: false,
                    message: "email atau password salah."
                })
            }

            const user = await User.findOne({ email })
            console.log(2)
            if (!user) {
                return res.status(200).json({
                    status: 400,
                    success: false,
                    message: "email tidak ditemukan."
                })
            }

            if (password!==user.password) {
                return res.status(200).json({
                    status: 400,
                    success: false,
                    message: "password salah."
                })
            }

            const access_token = generate_access_token({
                _id: user._id, email: user.email, role: user.role
            })

            const millisecondsInDay = 1000 * 60 * 60 * 24;
            const expiresInMilliseconds = millisecondsInDay * 999;

            res.cookie("access_token", access_token, {
                httpOnly: true,
                path: "/",
                sameSite: 'None',
                secure: true,
                expires: new Date(Date.now() + expiresInMilliseconds)
            })

            return res.status(200).json({
                success: true,
                token: access_token,
                data: "login success"
            })
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    }
}

module.exports = user_controller