const fs = require( 'fs/promises' );
const { execSync } = require( 'child_process' );
const path = require( 'path' );

const filePath = path.join( __dirname, 'test_cases.py' );
const filePath1 = path.join( __dirname, 'pythonMainFile.py');
const filePath2 = path.join( __dirname, 'input_code.py');

function runCode(command) {
    return execSync(command, { cwd: __dirname });
}


const writePythonTestCaseFile = async(code) => {
    try {
        await fs.writeFile( filePath, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};

const writePythonMainFile = async(code) => {
    try {
        await fs.writeFile( filePath1, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};

const writePythonInputCodeFile = async(code) => {
    try {
        await fs.writeFile( filePath2, code, 'utf-8' );
    } catch( error ) {
        console.error( error.message );
    }
};
module.exports = {
    writePythonMainFile,
    runCode,
    writePythonTestCaseFile,
    writePythonInputCodeFile
};


