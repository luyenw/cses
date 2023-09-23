const tokenAuthorize = require('../middlewares/tokenAuthorize')
const controller = require('../controllers/ResultController')
const router = require('express').Router()
router.get('/:id', tokenAuthorize, controller.get)
module.exports = router