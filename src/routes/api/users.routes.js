const express = require('express');

const {
    registerUser,
    loginUser,
    getAllExaminees
} = require('../../controllers/api/users.controller');

const {
    authenticate,
    authorize
} = require('../../middleware/auth')

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/examinees', authenticate, authorize(['examiner']), getAllExaminees);
module.exports = router;