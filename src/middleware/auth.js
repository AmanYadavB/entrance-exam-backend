const jwt = require( 'jsonwebtoken' );

const authenticate = ( req, res, next ) => {
    const token = req.header( 'Authorization' );
    
    jwt.verify( token, process.env.JWT_SECRET, function( err, claims ) {
        if( err ) {
            const error = new Error( 'Bad credentials' );
            // invalid user
            error.status = 401;
            next( error );
            return;
        }

        res.locals.claims = claims;
        next();
    });
};

const authorize = ( allowedRoles ) => { 
    return ( req, res, next ) => {
        const { claims } = res.locals;

        if( !allowedRoles.includes( claims.role ) ) {
            const error = new Error( 'Unauthorized' );
           
            error.status = 403;
            next( error );
            return;
        }

        next();
    };
};

module.exports = {
    authenticate,
    authorize
};