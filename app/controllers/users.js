const bcrypt = require("bcrypt")
const User = require("../api/models/users")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const saltRounds = 10

const create = async (req, res) => {
    try{
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
        res.json(all)
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
        const token = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN, { expiresIn: '1h' })
        // const token = jwt.sign({id: user._id}, process.env.ACCESS_TOKEN)
        res.header("auth_token", token).json({status:"success", message: "user found!!!", data: {user : user}});

    }catch(err){
        res.status(400).json({status:"failure", message: "user not found!!!", data: null});
    }
}


module.exports = {create, authenticate, showAll}