const controller = {}
const Problem = require('../schemas/Problem')
const bcrypt = require('bcrypt')
const User = require('../schemas/User')
const jwt = require('jsonwebtoken')
const {Validation} = require('../validations/validations')
module.exports=()=>{
    controller.get= async (req, res)=>{
        // var start = new Date()
        const problems = await Problem.findAll()
        return res.json(problems)
    }
    controller.get_login = async (req, res)=>{
        const problems = await Problem.findAll({})
        return res.json(problems)
    }
    controller.post_register= async(req, res)=>{
        const inp = req.body
        console.log(inp)
        try{
            const validatedDate = Validation.validateRegister(inp)
            const user = await User.findOne({where:{username: inp.username}})
            if (user){
                console.log(user)
                return res.status(422).json({'msg': 'username is exist'})
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
                return res.status(200).json({'data': returned_user})
            }
        }catch (error) {
            return res.status(422).json({'Validation error:': error.message});
        }
    }
    controller.post_login= async (req, res)=>{
        inp = req.body
        const user = await User.findOne({where: {username: inp.username}})
        if (!user){
            return res.status(422).json({'msg': 'username or password is not correct'})
        }
        const compare_password = await bcrypt.compare(inp.password, user.password)
        if (compare_password == false){
            return res.status(422).json({'msg': 'username or password is not correct'})
        }
        const accessToken = jwt.sign({id: user.id, username: inp.username}, process.env.ACCESS_SECRET_TOKEN);
        return res.setHeader(
            'set-cookie', `access_token=${accessToken}`
        ).status(200).send({token: accessToken});
        
    }
    controller.globalData=async(req,res)=>{
        const user = await User.findOne({where: {username: res.locals.username}})
        return res.status(200).json(user)
    }
    return controller
}