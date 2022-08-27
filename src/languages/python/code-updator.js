const {
    writePythonTestCaseFile,
    writePythonInputCodeFile,
    writePythonMainFile
} = require('../python/code-writer')
async function writePythonCodeFiles(data) {

        let testCaseFile = `def get_test_cases():
        return [${data.data.testCases.input.toString().replace(/[{]/gi,"[").replace(/[}]/gi,"]")}]
def get_expected_outputs():
    return ${data.data.testCases.expectedOutput.replace(/[{]/gi,"[").replace(/[}]/gi,"]")}`;
        let callingArg = ``;
        const noOfInputs = data.data.testCases.input[0].split(",").length;
        for(let i=0;i<noOfInputs;i++){
            if(i==noOfInputs-1)
                callingArg += ` test_cases[i][${i}]`;
            else
                callingArg += ` test_cases[i][${i}],`;
        }
        let mainFile = `from test_cases import get_test_cases
from test_cases import get_expected_outputs
from input_code import solution
        
def main_file(): 
    test_cases = get_test_cases()
    expected_outputs = get_expected_outputs()
        
    for i in range(len(test_cases)):
        output = solution(${callingArg})
        if output == expected_outputs[i]:
            print(output,",yes,",sep='',end='')
        else:
            print(output,",no,",sep='',end='')
main_file()`
        await writePythonTestCaseFile( testCaseFile);
        await writePythonInputCodeFile( data.data.code );
        await writePythonMainFile(mainFile);
}

module.exports = {
    writePythonCodeFiles
}