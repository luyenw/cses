const express = require('express')
const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = express.Router()

module.exports=()=>{
    const controller = require('../controllers/RootController')()
    router.get('/login', controller.get_login)
    router.post('/login', controller.post_login)
    router.post('/register', controller.post_register)
    router.get('/globalData', tokenAuthorize, controller.globalData)
    router.get('/', controller.get)
    return router
}