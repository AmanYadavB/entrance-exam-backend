class code
        {
            public static void main (String[] args) throws java.lang.Exception
            {
                codeRunner code = new codeRunner();
                testCases testCase = new testCases();
                int[][] testCase1 = testCase.getTestCases();
                int expectedOutputs[] = testCase.expectedOutputs();
                for (int i=0;i<testCase1.length;i++){
                    int output = code.solution( testCase1[i][0]);
                    if (output == expectedOutputs[i])
                        System.out.print(output+",yes,");
                    else
                        System.out.print(output+",no,");
                }
                
            }

        }