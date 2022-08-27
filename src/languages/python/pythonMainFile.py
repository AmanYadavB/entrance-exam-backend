from test_cases import get_test_cases
from test_cases import get_expected_outputs
from input_code import solution
        
def main_file(): 
    test_cases = get_test_cases()
    expected_outputs = get_expected_outputs()
        
    for i in range(len(test_cases)):
        output = solution( test_cases[i][0], test_cases[i][1], test_cases[i][2], test_cases[i][3])
        if output == expected_outputs[i]:
            print(output,",yes,",sep='',end='')
        else:
            print(output,",no,",sep='',end='')
main_file()