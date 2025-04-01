const express = require('express')
const tokenAuthorize = require('../middlewares/tokenAuthorize')
const isAdmin = require('../middlewares/checkRole')
const router = express.Router()
// const Problem = require('../models/Problem')
module.exports=()=>{
    const controller = require('../controllers/ProblemController')
    // POST /problems/
    router.post('/', isAdmin, controller.create)
    // GET  /problems/:id
    router.get('/:id', controller.get)
    // GET  /problems/:id/submit
    router.get('/:id/submit', controller.getAllSubmissions)
    // GET  /problems/:id/submit/user
    router.get('/:id/submit/user', tokenAuthorize, controller.getSubmissionsByUser)
    // GET /problems/:id/submit
    router.delete('/:id', controller.delete)
    return router;
}