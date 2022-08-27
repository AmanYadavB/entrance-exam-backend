
const {
    runCode
} = require('./code-writer')

function runPythonCode(){
    const filename1='pythonMainFile.py'
    let data = {
        status: '',
        returnData: ''
    };
    try{
   
        let stdout1 = runCode(`python ${filename1}`);
        console.log('no error');
        console.log(stdout1.toString());
        data.status = 'success';
        data.returnData = stdout1.toString();
    }
        catch(error){
            console.log('error');
            strOut = error.stderr.toString().replace(/File "C:\\Users\\amanyadav03\\fynd-fsd-jun-13-2022\\projects\\entrance-exam\\entrance-exam-backend\\languages\\python\\pythonMainFile.py",/gi,'');
            strOut = strOut.replace(/File "C:\\Users\\amanyadav03\\fynd-fsd-jun-13-2022\\projects\\entrance-exam\\entrance-exam-backend\\languages\\python\\input_code.py",/gi,'');
            console.log(strOut);
            data.status = 'Compilation Error'
            data.returnData = strOut
        }

        return data;
}

module.exports = {
    runPythonCode
}