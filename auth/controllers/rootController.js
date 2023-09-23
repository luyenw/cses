const bcrypt = require('bcrypt')
const User = require('../schemas/User')
const jwt = require('jsonwebtoken')
const {Validation} = require('../validations/validations')

var controller = {}
controller = {
    verify_token: async(req, res)=>{
        const token = req.headers.authorization
        if (!token) return res.status(401).send('denied')
        try {
            var decoded = await jwt.verify(token.split(' ')[1], process.env.ACCESS_SECRET_TOKEN)
            return res.sendStatus(2000)
        } catch (e) {
            return res.status(403).json({'msg':e})
        }
    },
    post_register: async(req, res)=>{
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
    },
    post_login: async (req, res)=>{
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
        return res.setHeader(
            'set-cookie', `access_token=${accessToken}`
        ).status(200).send({token: accessToken, user: user});
        
    },
    globalData: async(req,res)=>{
        console.log(res.locals.username)
        const user = await User.findOne({where: {username: res.locals.username}})
        return res.status(200).json(user)
    }
}
module.exports = controller