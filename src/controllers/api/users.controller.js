const {
    addUser,
    getUserByEmail,
    checkPassword,
    findAllExaminees,
    isNotRegistered
} = require('../../services/user.service');
const path = require('path');
const process = require('process');
const jwt = require('jsonwebtoken');

const registerUser = async(req, res, next) => {
        const user = req.body;
        if( Object.keys( user ).length === 0 ) {
            const httpError = new HttpError( "Body is missing", 400 );
    
            next( httpError );
            return;
        }
        try {
            
            await isNotRegistered(user.email);
            const updatedUser = await addUser( user );
            const userToSend = {
                ...updatedUser.toObject()
            };
            delete userToSend.password;
        
            res.status( 201 ).json({
            status: 'success',
            data: userToSend 
            });
        } catch( error ) {
            
            if (error.type === 'Conflict') {
                const httpError = new HttpError( error.message, 409 );
        
                next( httpError );
                }
            else {
                const httpError = new HttpError( error.message, 400 );
        
                next( httpError );
            }
            }
           
        }

    const loginUser = async ( req, res, next ) => {
        const credentials = req.body;
        
        if( !( credentials?.email && credentials?.password ) ) {
            const httpError = new HttpError( "Bad request", 400 );
    
            next( httpError );
            return;
        }
    
        const { email, password } = credentials;
    
        try {
            
            const user = await getUserByEmail( email );
           
            await checkPassword( user, password );
            
            const claims = {
                role: user.role,
                email: user.email, 
            };
    
           
            jwt.sign( claims, process.env.JWT_SECRET, function( error, token ) {
                
                if( error ) {
                    
                    const httpError = new HttpError( "Internal Server Error", 500 );
                    next( httpError );
                }
                
                res.json({
                    status: 'success',
                    data: {
                        name: user.name,
                        role: user.role,
                        _id: user._id, 
                        token
                    }
                });
            });
        } catch( error ) {
            if( error.type === 'BadCredentials' ) {
                
                const httpError = new HttpError( "Bad credentials", 403 );
                next( httpError );
            } else {
                const httpError = new HttpError( "Internal Server Error", 500 );
                next( httpError );
            }
        }
    };

    const getAllExaminees = async ( req, res, next ) => {
        console.log( 'claims = ', res.locals.claims );
        
        try {
            let allExaminees = await findAllExaminees();
            
            res.status( 201 ).json({
                status: 'success',
                data: allExaminees
            });
        } catch( error ) {
            const httpError = new HttpError( error.message, 400 );
    
            next( httpError );
        }
    };

module.exports = {
    registerUser,
    loginUser,
    getAllExaminees
}
