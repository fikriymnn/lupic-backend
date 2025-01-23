const jwt = require("jsonwebtoken")

function generate_access_token(payload){
     const token = jwt.sign(payload,process.env.ACC_TOKEN_SECRET)
     return token
}

module.exports = generate_access_token