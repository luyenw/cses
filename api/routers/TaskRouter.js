const express = require('express')
const tokenAuthorize = require('../middlewares/tokenAuthorize')
const router = express.Router()
// const Problem = require('../models/Problem')
module.exports=()=>{
    const controller = require('../controllers/TaskController')()
    router.get('/:id', controller.get)
    router.post('/', tokenAuthorize, controller.create)
    router.delete('/:id', controller.delete)
    return router;
}