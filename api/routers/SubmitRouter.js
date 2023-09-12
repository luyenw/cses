const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = require('express').Router()

module.exports = ()=>{
    controller = require('../controllers/SubmitController')()
    router.get('/:id',tokenAuthorize, controller.get)
    router.get('/:id/:id2',tokenAuthorize, controller.get2)
    router.post('/', tokenAuthorize, controller.post)
    return router
}