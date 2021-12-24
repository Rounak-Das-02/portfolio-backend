const bcrypt = require("bcrypt")
const User = require("../api/models/users")
const TokenList= require("../api/models/tokenlist")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const saltRounds = 10

// var blacklist = []

const create = async (req, res) => { // Must have my explicit token to create a new Super User
    try{
        if(req.body.specialPassword != process.env.PASSWORD) return res.status(400).json({status: "failure", message: "You are missing my special Permission!!!", data: null});
        const user = await User.findOne({name: req.body.name})
        if(user) return res.status(400).json({status: "failure", message: "User name already exists!!!", data: null});
        
        const salt = bcrypt.genSaltSync(saltRounds);
        const password = await bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name : req.body.name,
            password: password
        })

        const a1  = await newUser.save()
        res.json({status: "success", message: "User added successfully!!!", data: a1});
    }
    catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "User Could not be Added!!!", data: null});
    }
}

const showAll = async(req,res) => {
    try{
        const all = await User.find()
        res.json({_id : all[0]._id, name : all[0].name})
    }
    catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Something went wrong!!!", data: null});
    }
}

const authenticate = async(req,res) => {
    try{
        const user = await User.findOne({name: req.body.name})
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if(!isMatch) return res.status(400).json({status:"failure", message: "Invalid Email/Password", data: null});

        if(req.cookie["auth_token"]) return res.status(400).json({status:"failure", message: "Please Log Out of the existing session first", data: null});

        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '6h' })

        const tokenList = new TokenList({
            tokenId : token,
            author_id : user._id,
            author_name : user.name,
            black : false
        })
        const a1 = await tokenList.save()
        

        // const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN)
        res.header("auth_token", token).json({status:"success", message: "user found!!!", data: {id : user._id, name : user.name}});

    }catch(err){
        res.status(400).json({status:"failure", message: "user not found!!!", data: null});
    }
}

const logout = async (req, res) => {
    try{
        await TokenList.findOneAndUpdate({
            // tokenId : req.cookie["auth_token"]
            tokenId : req.headers["auth_token"]
        },
        {
            "$set": {black: true} // $set is necessary, otherwise it's gonna overwrite the entire document
        },
        );
        

        // if(!req.cookie["auth_token"]) res.status(400).json({status:"failure", message: "Could not Log Out Cookie !!!", data: null});

        // res.cookie("auth_token", "" , {expiresIn : 1})
        res.status(200).json({status:"success", message: "logged out !!!", data: null});
    }catch(err){
        // console.log(err)
        res.status(400).json({status:"failure", message: "Could not log out !!!", data: null});
        
    }
}

const logAllOut = async(req, res) => {
    try{
        const tokens = await TokenList.updateMany(
            {
                author_id : req.body.author_id,
            },
            {
                "$set" : { black : true}
            },
            {
                 multi : true
            }
        )

        res.cookie("auth_token", "" , {expiresIn : 1})
        res.status(200).json({status:"success", message: "Logged Out of All Sessions !!!", data: null});
    }catch(err){
        res.status(400).json({status:"failure", message: "Could not Log Out of All Sessions !!!", data: null});
    }
}


const ShowAllTokens = async (req, res) => {
    try{
        const all = await TokenList.find()
        res.json(all)
    }
    catch(err){
        console.log(err)
        res.status(400).json({status: "failure", message: "Something went wrong!!!", data: null});
    }
}

module.exports = {create, authenticate, showAll, logout, logAllOut, ShowAllTokens}