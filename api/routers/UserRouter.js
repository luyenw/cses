const router = require('express').Router()

const controller = require('../controllers/UserController')
router.get('/:id', controller.get_user)
module.exports = router