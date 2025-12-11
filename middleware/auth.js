const jwt = require("jsonwebtoken")

const auth_middleware = {
    auth: (req,res,next)=>{
        try{
            const token = req.cookies.access_token
            if(!token){
                return res.status(401).json({
                    success:false,
                    status_code: 401,
                    message: "Access token is not exist."
                })
            }
            jwt.verify(token,process.env.ACC_TOKEN_SECRET,(err,payload)=>{
                if(err){
                    return res.status(403).json({
                        success:false,
                        status_code: 403,
                        message: "Access token invalid."
                    })
                }
                req.user = payload
                next()
            })
        }catch(err){
            return res.status(500).json({
                success:false,
                status_code: 500,
                message:err.message
            })
        }
    },
}

module.exports = auth_middleware