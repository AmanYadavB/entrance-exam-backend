const express = require('express');

const {
    getAllQuestions,
    postQuestion,
    getQuestionById,
    deleteQuestionById
} = require("../../controllers/api/question");
const {
    authenticate,
    authorize
} = require('../../middleware/auth')
const router = express.Router();

router.post('/', authenticate, postQuestion);
router.get('/', authenticate, authorize( ['examiner']), getAllQuestions);
router.get('/:id', authenticate, getQuestionById);
router.delete('/:id', authenticate, authorize( ['examiner']), deleteQuestionById);
module.exports = router;
