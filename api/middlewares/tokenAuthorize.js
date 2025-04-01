const jwt = require('jsonwebtoken')

const tokenAuthorize = (req, res, next) =>{
    let token = req.headers.authorization
    if (!token) return res.status(401).send('denied')
    token = token.substring(7)
    try {
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        res.locals.username = jwt.decode(token).username
        next();
    } catch (e) {
        return res.json({'msg':e})
    }
}
module.exports = tokenAuthorize