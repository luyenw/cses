const jwt = require('jsonwebtoken')

const tokenAuthorize = (req, res, next) =>{
    const token = req.cookies.access_token
    if (!token) return res.status(401).send('denied')
    try {
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        res.locals.username = jwt.decode(token).username
        next();
    } catch (e) {
        return res.json({'msg':e})
    }
}
module.exports = tokenAuthorize