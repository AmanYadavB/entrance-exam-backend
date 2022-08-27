const {
    writeTestCaseFile,
    writeHelloFile,
    writeMainFile
} = require('../java/code-writer')
async function writeJavaCodeFiles(data) {
        let testCaseFile = `public class testCases {
            public int[][] getTestCases() {
                int testCase[][] = {${data.data.testCases.input.toString()}};
                return testCase;
            }
            public int[] expectedOutputs() {
                int expectedOutputs[] = ${data.data.testCases.expectedOutput};
                return expectedOutputs;
            }
        }`;
        let callingArg = ``;
        const noOfInputs = data.data.testCases.input[0].split(",").length;
        for(let i=0;i<noOfInputs;i++){
            if(i==noOfInputs-1)
                callingArg += ` testCase1[i][${i}]`;
            else
                callingArg += ` testCase1[i][${i}],`;
        }
        let mainFile = `class code
        {
            public static void main (String[] args) throws java.lang.Exception
            {
                codeRunner code = new codeRunner();
                testCases testCase = new testCases();
                int[][] testCase1 = testCase.getTestCases();
                int expectedOutputs[] = testCase.expectedOutputs();
                for (int i=0;i<testCase1.length;i++){
                    int output = code.solution(${callingArg});
                    if (output == expectedOutputs[i])
                        System.out.print(output+",yes,");
                    else
                        System.out.print(output+",no,");
                }
                
            }

        }`
        await writeTestCaseFile( testCaseFile);
        await writeHelloFile( data.data.code );
        await writeMainFile(mainFile);
}

module.exports = {
    writeJavaCodeFiles
}