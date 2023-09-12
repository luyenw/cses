const express = require('express')
const router = express.Router()

module.exports=()=>{
    const controller = require('../controllers/RootController')()
    router.get('/login', controller.get_login)
    router.post('/login', controller.post_login)
    router.post('/register', controller.post_register)
    router.get('/', controller.get)
    return router
}