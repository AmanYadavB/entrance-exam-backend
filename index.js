require('./src/init');
const cors = require("cors");
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const indexRouter = require( './src/routes/pages/index.routes' );
const answerRouter = require('./src/routes/api/answers.routes')
const usersRouter = require('./src/routes/api/users.routes')
const assesmentRouter = require( './src/routes/api/assesments.routes' );
const questionRouter = require('./src/routes/api/question.routes')
const { request } = require('http');


const app = express();

const {connect}= require('./src/data/database');
connect();

app.set( 'title', 'Entrance Exam' );

//app.set( 'view engine', 'ejs' );
app.set( 'views', path.join( process.cwd(), 'views' ) );

// app.use( logger );
app.use( morgan( 'combined' ) ); // 'combined' -> Apache HTTP server format for logs

// app.use(( req, res, next ) => {
//     console.log( 'A request was received (1) | req.url = ', req.url );
//     next();
// });

app.use( express.static( path.join( process.cwd(), 'public' ) ) );

app.use( express.json() );
app.use(cors());
// to take care of reading data submitted using a form
app.use( express.urlencoded() );

//app.use( indexRouter );
app.use( '/assesments', assesmentRouter );
app.use( '/answers', answerRouter );
app.use( '/questions', questionRouter );
app.use( '/api/auth', usersRouter );
const PORT = 8080;

app.listen( PORT, () => {
        console.log( `Server running on http://localhost:${PORT}` );
    }).on( 'error', error => { // server.on( ... )
        console.error( error.message );
    });