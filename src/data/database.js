const mongoose = require( 'mongoose' );

mongoose.set( 'returnOriginal', false );
mongoose.set( 'runValidators', true );
const process = require('process');
//const { mongoImport } = require('./init');
// define the Models
//require( '../models/User' );
//require( '../models/Workshop' );
//require( '../models/Topic' );

//const env = process.env.NODE_ENV;
const env = 'development';

const connect = async () => {
    try {
        //mongodb+srv://admin:<password>@cluster0.u9uqfb9.mongodb.net/?retryWrites=true&w=majority
        console.log(env);
        if (env == 'development') {
             await mongoose.connect( `mongodb://localhost:27017/entranceExamDB` );
        }
        else if (env == 'production') {
            const dbUser = process.env.DB_USER;
            const dbPassword = process.env.DB_PASSWORD;
            const dbHost = process.env.DB_HOST;
            await mongoose.connect( `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/entranceExamDB?retryWrites=true&w=majority` );
            console.log( 'connected to db' );
            //require('./init')
        }
    } catch( error ) {
        console.log( error );
        process.exit( 1 );
    }
};

module.exports = {
    connect
}
