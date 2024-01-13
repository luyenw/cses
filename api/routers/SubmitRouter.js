const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = require('express').Router()

module.exports = ()=>{
    controller = require('../controllers/SubmitController')
    // GET  /submit/:id/details
    router.get('/:id/details',tokenAuthorize, controller.get_submission_details)
    // POST /submit
    router.post('/', tokenAuthorize, controller.post_new_submission)
    return router
}