const bcrypt = require("bcrypt")
const User = require("../api/models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const saltRounds = 10

var blacklist = []

const create = async (req, res) => { // Must have my explicit token to create a new Super User ->  Implementation, at a later stage
    try{
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
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '6h' })
        // const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN)
        res.header("auth_token", token).json({status:"success", message: "user found!!!", data: {id : user._id, name : user.name}});

    }catch(err){
        res.status(400).json({status:"failure", message: "user not found!!!", data: null});
    }
}

const logout = async (req, res) => {
    try{
        blacklist.push(res.cookies["auth_token"])
        res.cookie("auth_token", "" , {expiresIn : 1})
    }catch(err){
        console.log("No Cookie")
    }
}



module.exports = {create, authenticate, showAll, logout}