const fs = require( 'fs/promises' );
const { execSync } = require( 'child_process' );
const path = require( 'path' );

const filePath = path.join( __dirname, 'codeRunner.java' );
const filePath1 = path.join( __dirname, 'testCases.java');
const filePath2 = path.join( __dirname, 'code.java');

function runCode(command) {
    return execSync(command, { cwd: __dirname });
}


const writeHelloFile = async(code) => {
    try {
        await fs.writeFile( filePath, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};

const writeTestCaseFile = async(code) => {
    try {
        await fs.writeFile( filePath1, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};

const writeMainFile = async(code) => {
    try {
        await fs.writeFile( filePath2, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};
module.exports = {
    writeHelloFile,
    runCode,
    writeTestCaseFile,
    writeMainFile
};


