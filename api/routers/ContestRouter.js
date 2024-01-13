const tokenAuthorize = require('../middlewares/tokenAuthorize')
const controller = require('../controllers/ContestController.js')
const router = require('express').Router()
// POST /contest/
router.post('/', tokenAuthorize, controller.postContest)
// GET /contest/
router.get('/', controller.getAllContest)
// GET /contest/:id
router.get('/:id', controller.getContestById)
// GET  /contest/:id/problems
router.get('/:id/problems', tokenAuthorize, controller.getContestProblemsById)
// GET  /:contest_id/problems/:problem_id/submit
router.get('/:contest_id/problems/:problem_id/submit', tokenAuthorize, controller.getSubmitsByProblemId)
// GET  /:contest_id/problems/:problem_id/submit
router.get('/:contest_id/problems/:problem_id/submit/user', tokenAuthorize, controller.getSubmitsByUser)
// GET  /contest/:id/submit/
router.get('/:id/submit', controller.getSubmissionsByContestId)
// POST /contest/:id/submit/
router.post('/:id/submit', controller.postSubmissionByContestId)
module.exports = router