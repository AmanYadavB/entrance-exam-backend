const fs = require( 'fs/promises' );
const { execSync } = require( 'child_process' );
const path = require( 'path' );

//const filePath = path.join( __dirname, 'test_cases.py' );
const filePath1 = path.join( __dirname, 'cpp-main-file.cpp');
const filePath2 = path.join( __dirname, 'input-code.cpp');

function runCode(command) {
    return execSync(command, { cwd: __dirname });
}


const writeCppMainFile = async(code) => {
    try {
        await fs.writeFile( filePath1, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};

const writeCppInputCodeFile = async(code) => {
    try {
        await fs.writeFile( filePath2, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};
module.exports = {
    writeCppMainFile,
    runCode,
    writeCppInputCodeFile
};


