const jwt = require("jsonwebtoken")
const TokenList= require("../api/models/tokenlist")

const verify = async (req, res, next) => {
    const token = req.headers["auth_token"]
    if(!token) return res.status(400).json({status:"failure", message: "Access Denied", data: null});
    
    try{
        const tok_find = await TokenList.find({
            tokenId : token
        })
        const tok = tok_find[0]
        
        if (Date.now() - tok.date_created > 6*60*60*1000) // Expires automatically after 6 hours whenever someone tries to re-use a token
        {
            await tok.updateOne({
                "$set" : {black : true}
            });
            return res.status(400).json({status:"failure", message: "Invalid Token", data: null});
        }

        if (tok.black) return res.status(400).json({status:"failure", message: "Invalid Token", data: null});
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN)
        req.user = verified
        next()
    }catch(err){
        return res.status(400).json({status:"failure", message: "Invalid Token", data: null});
    }
}

module.exports = verify