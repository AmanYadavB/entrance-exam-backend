require('dotenv').config();
const {execSync} = require('child_process');
const path = require('path');
const DB_NAME = 'entranceExamDB';
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const env = process.env.NODE_ENV;

let uri;

if (env === 'development') {
    uri = "";
}
else if (env === 'production') {
    uri = `--uri "mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/entranceExamDB?ssl=true&authSource=admin"`;
}
try {
    execSync(`mongoimport ${uri} --db ${DB_NAME} --collection assesments --drop --file ${path.join(__dirname,'seed/assesments.json')} --jsonArray`);
    console.log('successfully imported assesments documents in '+ DB_NAME + ' Database');
}
catch(err) {
    console.error(err.message);
}

try {
    execSync(`mongoimport ${uri} --db ${DB_NAME} --collection questions --drop --file ${path.join(__dirname,'seed/questions.json')} --jsonArray`);
    console.log('successfully imported assesments documents in '+ DB_NAME + ' Database');
}
catch(err) {
    console.error(err.message);
}

try {
    execSync(`mongoimport ${uri} --db ${DB_NAME} --collection answers --drop --file ${path.join(__dirname,'seed/answers.json')} --jsonArray`);
    console.log('successfully imported assesments documents in '+ DB_NAME + ' Database');
}
catch(err) {
    console.error(err.message);
}

try {
    execSync(`mongoimport ${uri} --db ${DB_NAME} --collection users --drop --file ${path.join(__dirname,'seed/users.json')} --jsonArray`);
   console.log('successfully imported assesments documents in '+ DB_NAME + ' Database');
}
catch(err) {
    console.error(err.message);
}
