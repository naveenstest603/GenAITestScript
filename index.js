const readline = require("readline");
const path = require("path");
const { generateCode, generateTestCases, readFile } = require("./utils");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
console.log('\n*****<  Welcome to the hasselfree AI based Test Cases & Code Generation Tool  >****');
console.log('\nSelect an option to execute:');
console.log('1: Code Generation');
console.log('2: Test Case Generation');
rl.question('Enter your choice (1 or 2): ', async (option) => {
  if (option === '1') {
    console.log('\nSelect code generation type:');
    console.log('1: Based on Sample input Code');
    console.log('2: Based on Test Cases');
    rl.question('Enter your choice (1 or 2): ', async (codeOption) => {
      if (codeOption === '1' || codeOption === '2') {
        rl.question('Enter the path to the input file: ', async (inputFilePath) => {
          
            await generateCode(inputFilePath, rl);
          
        });
      } else {
        console.log('Invalid option selected.');
        rl.close();
      }
    });
  } else if (option === '2') {
    rl.question('Enter the test scenario or the path to the file containing the scenario: ', async (scenarioInput) => {
      if (path.isAbsolute(scenarioInput) || scenarioInput.startsWith('.')) {
        const scenario = await readFile(scenarioInput);
        await generateTestCases(scenario, rl);
      } else {
        await generateTestCases(scenarioInput, rl);
      }
    });
  } else {
    console.log('Invalid option selected.');
    rl.close();
  }
});
