const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = require('express').Router()

module.exports = ()=>{
    controller = require('../controllers/SubmitController')()
    router.get('/view/:id',tokenAuthorize, controller.view)
    router.get('/:id/:submission_id',tokenAuthorize, controller.get_result)
    router.get('/:id',tokenAuthorize, controller.get)
    router.post('/', tokenAuthorize, controller.post)
    return router
}