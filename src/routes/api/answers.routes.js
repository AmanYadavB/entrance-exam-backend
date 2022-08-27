const express = require( 'express' );

const {
    getUsers,
    submitAnswer,
    getAnswerOfUser
} = require('../../controllers/api/answers.controller');

const {
    authenticate,
    authorize
} = require('../../middleware/auth')

const router = express.Router();


router.post( '/',authenticate, authorize( ['examinee'] ), submitAnswer );
router.get('/users/:id', authenticate, authorize( ['examiner']), getUsers);
router.get('/answerbyuser/:id', authenticate, authorize( ['examiner']), getAnswerOfUser);
//router.get('/answer/:id', authenticate, authorize( ['examiner']), getAnswers);
module.exports = router;