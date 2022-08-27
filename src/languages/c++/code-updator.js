const {
    writeCppInputCodeFile,
    writeCppMainFile
} = require('../c++/code-writer')
async function writeCppCodeFiles(data) {
        let callingArg = ``;
        const noOfInputs = data.data.testCases.input[0].split(",").length;
        for(let i=0;i<noOfInputs;i++){
            if(i==noOfInputs-1)
                callingArg += ` test_cases[i][${i}]`;
            else
                callingArg += ` test_cases[i][${i}],`;
        }
        let mainFile = `#include<iostream>
using namespace std;
        
#include"input-code.cpp"
#include"test-cases.cpp"
int main () {
    int test_cases[][${noOfInputs}] = {${data.data.testCases.input.toString()}};
    int expected_outputs[] = ${data.data.testCases.expectedOutput};
        
    for (int i=0;i<sizeof(test_cases)/sizeof(test_cases[0]);i++){
        int output = solution(${callingArg});
        if (output == expected_outputs[i])
            cout<<output<<",yes,";
        else
            cout<<output<<",no,";
    }
}`
        await writeCppInputCodeFile( data.data.code );
        await writeCppMainFile(mainFile);
}

module.exports = {
    writeCppCodeFiles
}