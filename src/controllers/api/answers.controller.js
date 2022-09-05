const {
    findUsers,
    findAnswerOfUser,
    addAnswer
} = require('../../services/answer.services');

const getUsers = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const examId = req.params.id
    try {
        let users = await findUsers(examId);
            
            res.status( 201 ).json({
                status: 'success',
                data: users
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const getAnswerOfUser = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const examId = req.params.id;
    const userId = req.query.userId;
    try {
        let users = await findAnswerOfUser(examId, userId);
            
            res.status( 201 ).json({
                status: 'success',
                data: users
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const submitAnswer = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const assesment = req.body;
    try {
        let addedAssesment = await addAnswer( assesment );
            
            res.status( 201 ).json({
                status: 'success',
                data: addedAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

module.exports = {
    getUsers,
    getAnswerOfUser,
    submitAnswer
}