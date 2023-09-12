const controller = {}
const Task = require('../models/Task')
const Submission = require('../models/Submission')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {Validation} = require('../validations/validations')
const session = require('express-session')
module.exports=()=>{
    controller.get= async (req, res)=>{
        // var start = new Date()
        const tasks = await Task.findAll()
        return res.json(tasks)
    }
    controller.get_login = async (req, res)=>{
        const tasks = await Task.findAll({})
        return res.json(tasks)
    }
    controller.post_register= async(req, res)=>{
        const inp = req.body
        try{
            const validatedDate = Validation.validateRegister(inp)
            const user = await User.findOne({where:{username: inp.username}})
            if (user){
                console.log(user)
                res.status(422).json({'msg': 'username is exist'})
                return 
            }
            const salt = await bcrypt.genSalt(10)
            const hash_password = await bcrypt.hash(inp.password, salt)
    
            const new_user = new User({
                username: inp.username,
                password: hash_password,
                name: inp.name
            })
            returned_user = await User.create(new_user.dataValues)
            if(returned_user){
                
                res.json(returned_user)
            }
        }catch (error) {
            res.status(422).json({'Validation error:': error.message});
        }
    }
    controller.post_login= async (req, res)=>{
        inp = req.body
        console.log(inp)
        const user = await User.findOne({where: {username: inp.username}})
        if (!user){
            return res.status(422).json({'msg': 'username or password is not correct'})
        }
        const compare_password = await bcrypt.compare(inp.password, user.password)
        if (compare_password == false){
            return res.status(422).json({'msg': 'username or password is not correct'})
        }
        const accessToken = jwt.sign({username: inp.username, password: user.password}, process.env.ACCESS_SECRET_TOKEN);
        return res.cookie("access_token", accessToken, {
            httpOnly: true
        }).status(200).json({token: accessToken, user: user});
    }
    return controller
}