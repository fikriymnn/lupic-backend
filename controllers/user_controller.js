const User = require("../model/user_model")
const generate_access_token = require("../utils/generate_access_token")
const jwt = require("jsonwebtoken")

const user_controller = {
    get_user: async (req, res) => {
        try {
            const data = req.user

            if(!data){
               res.status(200).json({
                  success: false,
                  data: "user is not exist"
               })
            }

            res.status(200).send(data)
            
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
    
             return res.status(200).send("success")
          } catch (err) {
             return res.status(500).json({
                success: false,
                message: err.message
             })
        }
    },
    login_user: async (req, res) => {
        try {
            const { password, email } = req.body
            if (!password && !email) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "email atau password salah."
                })
            }

            const user = await User.findOne({ email })
            if (!user) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "email tidak ditemukan."
                })
            }

            if (password!==user.password) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "password salah."
                })
            }

            const access_token = generate_access_token({
                _id: user._id, email: user.email, role: user.role,no_wa:user.no_wa,instansi:user.instansi,tgl_lahir:user.tgl_lahir,nama:user.nama
            })

            const millisecondsInDay = 1000 * 60 * 60 * 24;
            const expiresInMilliseconds = millisecondsInDay * 999;

            res.cookie("access_token", access_token, {
                httpOnly: true,
                path: "/",
                sameSite: 'None',
                secure:true,
                expires: new Date(Date.now() + expiresInMilliseconds)
            })

            return res.status(200).send("success")
        } catch (err) {
            console.log(err.message)
            return res.status(500).json({
                success: false,
                message: err.message
            })
        }
    },
    register_user: async (req, res) => {
        try {
            const { password, email,nama,no_wa,instansi,tgl_lahir
             } = req.body
            if (!password && !email && !nama && !no_wa && !instansi && !tgl_lahir) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "lengkapi field terlebih dahulu."
                })
            }

            const user = await User.findOne({ email })
            if (user) {
                return res.status(400).json({
                    status: 400,
                    success: false,
                    message: "email sudah digunakan."
                })
            }

            const data = await User.create({
                password, email,nama,no_wa,instansi,tgl_lahir
            })

            const access_token = generate_access_token({
                _id: data._id, email: email, role: "user",no_wa:data.no_wa,instansi:data.instansi,tgl_lahir:data.tgl_lahir,nama:data.nama
            })

            const millisecondsInDay = 1000 * 60 * 60 * 24;
            const expiresInMilliseconds = millisecondsInDay * 999;

            res.cookie("access_token", access_token, {
                httpOnly: true,
                path: "/",
                sameSite: 'None',
                secure:true,
                expires: new Date(Date.now() + expiresInMilliseconds)
            })

            return res.status(200).send("success")
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