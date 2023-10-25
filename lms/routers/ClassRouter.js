const router = require('express').Router()
const controller = require('../controllers/ClassController')
const tokenAuthorize = require('../middlewares')
router.get('/:id/ps', tokenAuthorize, controller.get_ps)
router.post('/:id/ps', tokenAuthorize, controller.new_ps)
router.get('/:id', tokenAuthorize, controller.get_by_id)
router.post('/', tokenAuthorize, controller.new_class)
router.get('/', tokenAuthorize, controller.get_root)

module.exports = router