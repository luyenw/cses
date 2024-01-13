const axios = require('axios');
const { response } = require('express');

const tokenAuthorize = async (req, res, next) =>{
    const token = req.cookies.access_token
    if (!token) return res.status(401).send('denied')
    try {
        // jwt.verify(token, process.env.ACCESS_SECRET_TOKEN)
        // res.locals.username = jwt.decode(token).username
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };
        const apiUrl = process.env.VUE_APP_API_URL;
        const response = await axios.post(`${apiUrl}:3004/verify`, "", config)
        res.locals.user = response.data
        console.log(response.data)
        next();
    } catch (e) {
        console.log(e)
        return res.json({'msg':e})
    }
}
module.exports = tokenAuthorize