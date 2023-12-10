const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = require('express').Router()

module.exports = ()=>{
    controller = require('../controllers/SubmitController')()
    // get submission details: [testcases, passed..]
    router.get('/view/:submission_id',tokenAuthorize, controller.get_submission_details)
    // get all submissions by user with problem id <:id>
    router.get('/:problem_id',tokenAuthorize, controller.get_submissions_by_user_id)
    // get all submissions by any user with problem id <:id>
    router.get('/:problem_id/all',tokenAuthorize, controller.get_submissions_by_problem_id)
    // post a submission form: [source_code, lang..]
    router.post('/', tokenAuthorize, controller.post_new_submission)
    return router
}