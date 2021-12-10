const jwt = require("jsonwebtoken")
const verify = async (req, res, next) => {
    const token = req.headers["auth_token"]
    if(!token) return await res.status(400).json({status:"failure", message: "Access Denied", data: null});
    
    try{
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = verified
    }catch(err){
        await res.status(400).json({status:"failure", message: "Invalid Token", data: null});
    }
}

module.exports = verify