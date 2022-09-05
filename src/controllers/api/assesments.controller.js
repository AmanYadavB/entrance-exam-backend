
const {execSync} = require('child_process');

const {
    addAssesment,
    findAllAssesmentByUserId,
    findAssesmentById,
    findAllAssesments,
    findSampleAssesment,
    deleteOneAssesmentById
} = require('../../services/assesment.service');

const {
    getTestCases
} = require('../../services/questions.service');
const {runCppCode} = require('../../languages/c++/cppCodeRunner');
const { writeCppCodeFiles} = require('../../languages/c++/code-updator')
const { runJavaCode } = require('../../languages/java/javaCodeRunner');
const { writeJavaCodeFiles } = require('../../languages/java/code-updator');
const {runPythonCode} = require('../../languages/python/pythonCodeRunner');
const {writePythonCodeFiles} = require('../../languages/python/code-updator')
const postAnswer = async ( req, res, next ) => {
    console.log( 'claims = ', res.locals.claims );
    const data = req.body;
    
    if(data.data.language=='java')
    {
    try {
        await writeJavaCodeFiles(data);
        const dataToReturn = runJavaCode();
        res.status( 201 ).json({
            status: dataToReturn.status,
            data: dataToReturn.returnData
        });
    } catch( error ) {
        const httpError = new HttpError( error.message, 400 );

        next( httpError );
    }
}
    else if(data.data.language=='python'){
        try {
            
            await writePythonCodeFiles(data);
            const dataToReturn = runPythonCode();
            
            res.status( 201 ).json({
                status: dataToReturn.status,
                data: dataToReturn.returnData
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
    }

    else if(data.data.language=='c_cpp'){
        try {
           
            await writeCppCodeFiles(data);
            const dataToReturn = runCppCode();
            
            res.status( 201 ).json({
                status: dataToReturn.status,
                data: dataToReturn.returnData
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
    }
};


const postAssesment = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const assesment = req.body;
    
    try {
        let addedAssesment = await addAssesment( assesment );
            
            res.status( 201 ).json({
                status: 'success',
                data: addedAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const getAllAssesmentByUserId = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const examineeId = req.query.userId
    
    try {
        let addedAssesment = await findAllAssesmentByUserId(examineeId);
            
            res.status( 201 ).json({
                status: 'success',
                data: addedAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const getAllAssesments = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    try {
        let allassesments = await findAllAssesments();
            
            res.status( 201 ).json({
                status: 'success',
                data: allassesments
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const getSampleAssesment = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    try {
        let sampleAssesment = await findSampleAssesment();
            
            res.status( 201 ).json({
                status: 'success',
                data: sampleAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const getAssesmentById = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const id = req.params.id;
   
    try {
        let addedAssesment = await findAssesmentById(id);
            
            res.status( 201 ).json({
                status: 'success',
                data: addedAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

const deleteAssesmentById = async (req, res, next) => {

    console.log( 'claims = ', res.locals.claims );
    const id = req.params.id;
   
    try {
        let deletedAssesment = await deleteOneAssesmentById(id);
            
            res.status( 201 ).json({
                status: 'success',
                data: deletedAssesment
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
}

module.exports = {
    postAnswer,
    postAssesment,
    getAllAssesments,
    getSampleAssesment,
    getAllAssesmentByUserId,
    getAssesmentById,
    deleteAssesmentById
}