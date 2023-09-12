const tokenAuthorize = require('../middlewares/tokenAuthorize')
const controller = require('../controllers/ResultController')()
const router = require('express').Router()
module.exports = () =>{
    router.get('/:id', tokenAuthorize, controller.get)
    return router
}