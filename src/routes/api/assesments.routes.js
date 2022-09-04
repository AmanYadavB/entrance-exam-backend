const express = require( 'express' );
const {
    postAnswer,
    postAssesment,
    getAllAssesments,
    getSampleAssesment,
    getAllAssesmentByUserId,
    getAssesmentById,
    deleteAssesmentById
} = require( '../../controllers/api/assesments.controller' );

const {
    authenticate,
    authorize
} = require('../../middleware/auth')

const router = express.Router();


router.post( '/answer',authenticate, authorize( ['examinee'] ), postAnswer );
router.post('/', authenticate , authorize( ['examiner'] ), postAssesment);
router.get('/allassesments', authenticate, authorize(['examiner']), getAllAssesments);
router.get('/sample', authenticate, getSampleAssesment)
router.get('/', authenticate, getAllAssesmentByUserId);
router.get('/:id',authenticate, getAssesmentById)
router.delete('/:id',authenticate, authorize( ['examiner']), deleteAssesmentById)
module.exports = router;