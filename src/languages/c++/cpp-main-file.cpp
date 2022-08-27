#include<iostream>
using namespace std;
        
#include"input-code.cpp"
#include"test-cases.cpp"
int main () {
    int test_cases[][4] = {{1, 2, 3, 4},{2, 3, 4, 5},{3, 4, 5, 6},{4, 5, 6, 7},{5, 6, 7, 8}};
    int expected_outputs[] = {10,14,18,22,26};
        
    for (int i=0;i<sizeof(test_cases)/sizeof(test_cases[0]);i++){
        int output = solution( test_cases[i][0], test_cases[i][1], test_cases[i][2], test_cases[i][3]);
        if (output == expected_outputs[i])
            cout<<output<<",yes,";
        else
            cout<<output<<",no,";
    }
}