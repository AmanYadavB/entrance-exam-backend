
const {
    runCode
} = require('./code-writer')

function runCppCode(){
    const filename1='cpp-main-file.cpp'
    //const filename2 = 'code';
    let data = {
        status: '',
        returnData: ''
    };
    try{
   
        let stdout1 = runCode(`g++ ${filename1}`);
        console.log('no error');
        console.log(stdout1.toString());
        
        try{
            
            let stdout2 = runCode(`./a.out`);
            console.log('no error');
            console.log(stdout2.toString());
            data.status = 'success';
            data.returnData = stdout2.toString()
        }
            catch(error){
                console.log('error');
                console.log(error.stderr.toString());
                data.status = 'Runtime error',
                data.returnData = error.stderr.toString()
        }}
        catch(error){
            console.log('error');
            console.log(error.stderr.toString());
            data.status = 'Compilation Error'
            data.returnData = error.stderr.toString()
        }

        return data;
}

module.exports = {
    runCppCode
}