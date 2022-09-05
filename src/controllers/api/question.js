const {
    addQuestion,
    getQuestions,
    getQuestionByIdDB,
    deleteOneQuestionById
} = require('../../services/questions.service');

const postQuestion = async ( req, res, next ) => {
    console.log( 'claims = ', res.locals.claims );
    
    const question = req.body;
    try {
        let updatedQuestion = await addQuestion( question );
        res.status( 201 ).json({
            status: 'success',
            data: updatedQuestion
        });
    } catch( error ) {
        const httpError = new HttpError( error.message, 400 );

        next( httpError );
    }
};

const getAllQuestions = async ( req, res, next ) => {
    console.log( 'claims = ', res.locals.claims );
    
    try {
        let allQuestions = await getQuestions();
        
        res.status( 201 ).json({
            status: 'success',
            data: allQuestions
        });
    } catch( error ) {
        const httpError = new HttpError( error.message, 400 );

        next( httpError );
    }
};

const getQuestionById = async ( req, res, next ) => {
    console.log( 'claims = ', res.locals.claims );
    
    const id = req.params.id;
    
    try {
        let question = await getQuestionByIdDB(id);
        
        res.status( 201 ).json({
            status: 'success',
            data: question
        });
    } catch( error ) {
        const httpError = new HttpError( error.message, 400 );

        next( httpError );
    }
};

const deleteQuestionById = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const id = req.params.id;
    
    try {
        let deletedQuestion = await deleteOneQuestionById(id);
            
            res.status( 201 ).json({
                status: 'success',
                data: deletedQuestion
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

module.exports = {
    postQuestion,
    getAllQuestions,
    getQuestionById,
    deleteQuestionById
}