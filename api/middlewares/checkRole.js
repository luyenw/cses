const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next) =>{
    let token = req.headers.authorization
    if (!token) return res.status(403).send('denied')
    token = token.substring(7)
    try {
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        if (jwt.decode(token).role == "admin")
            res.locals.username = jwt.decode(token).username
            next();
    } catch (e) {
        return res.json({'msg':e})
    }
}

module.exports = isAdmin