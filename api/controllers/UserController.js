const User = require('../schemas/User')
controller = {
    get_user: async (req, res)=>{
        const id = req.params.id
        const user =  await User.findByPk(id)
        if(user) return res.status(200).json({
            id: user.id,
            name: user.name,
            imgUrl: user.imgUrl
        })
        return res.json({'msg': 'not found'})
    }
}
module.exports = controller