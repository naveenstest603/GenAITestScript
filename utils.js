const fs = require("fs").promises;
const path = require("path");
const { stringify } = require("csv-stringify/sync");
const OpenAI = require("openai");

require("dotenv").config();

// Check if the OPENAI_API_KEY environment variable is loaded
if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not set. Please check your .env file.");
  process.exit(1);
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const readFile = async (fileName) => {
  try {
    const content = await fs.readFile(fileName, "utf8");
    return content;
  } catch (error) {
    console.error(`Error reading file ${fileName}: ${error.message}`);
    throw error;
  }
};

const saveFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, content, "utf8");
    console.log(`File ${filePath} has been written successfully.`);
  } catch (error) {
    console.error(`Error writing to file ${filePath}: ${error.message}`);
    throw error;
  }
};

const ensureDirectoryExistence = async (filePath) => {
  const dirname = path.dirname(filePath);
  try {
    await fs.access(dirname);
  } catch (error) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(dirname, { recursive: true });
      console.log(`Directory ${dirname} was created.`);
    } else {
      throw error;
    }
  }
};

const generateOpenAIResponse = async (prompt) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
    temperature: 0,
    max_tokens: 2000,
  });

  const { choices } = response;
  const { message } = choices[0];
  const { content } = message;

  return content;
};

const getCurrentDateTime = () => {
  const now = new Date();
  const date = now.toISOString().split('T')[0];
  const time = now.toTimeString().split(' ')[0].replace(/:/g, '-');
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/\//g, '-');
  return `${date}_${time}`;
};

const generateCode = async (readfilePath, rl) => {
  try {
    const data = await readFile(readfilePath);
    const promptTemplate = await readFile(path.resolve(__dirname, 'prompts/code_generation_prompt.txt'));

    const prompt = `
    You are a code generator. Generate Playwright code for the following input code using the Page Object Model (POM) format. Include element locators and create a comprehensive test script. Ensure that the test script includes multiple test cases for each action to thoroughly validate the functionality.
${promptTemplate}

Below is the input code to modify into the Page Object Model format with a detailed test script featuring multiple test cases for each action:
${data.toString()}
    `;

    const content = await generateOpenAIResponse(prompt);

    const [pomCode, testCode] = content.split("// Test script");

    const currentDateTime = getCurrentDateTime();

    rl.question('Enter the relative path to save the files: ', async (relativePath) => {
      const baseDir = path.resolve(__dirname, relativePath);
      await ensureDirectoryExistence(baseDir);

      const writefilePathPOM = path.join(baseDir, `PageObjectModel_${currentDateTime}.js`);
      await saveFile(writefilePathPOM, pomCode + "\n// Test script");

      const writefilePathTest = path.join(baseDir, `TestScript_${currentDateTime}.spec.js`);
      await saveFile(writefilePathTest, "// Test script\n" + testCode);

      console.log(`Files have been saved to ${baseDir}`);
      rl.close();
    });
  } catch (err) {
    console.error(err.message);
  }
};

const generateTestCases = async (scenario, rl) => {
  try {
    const promptTemplate = await readFile(path.resolve(__dirname, 'prompts/test_case_generation_prompt.txt'));

    const prompt = `
${promptTemplate}
${scenario}
    `;

    const content = await generateOpenAIResponse(prompt);

    // Convert the content into CSV format
    const csvContent = `${content.trim()}`;

    const currentDateTime = getCurrentDateTime();

    rl.question('Enter the relative path to save the CSV file: ', async (relativePath) => {
      const baseDir = path.resolve(__dirname, relativePath);
      await ensureDirectoryExistence(baseDir);

      const writefilePathCSV = path.join(baseDir, `TestCases_${currentDateTime}.csv`);
      await saveFile(writefilePathCSV, csvContent);
      console.log(`Test cases have been written successfully to ${writefilePathCSV}`);
      rl.close();
    });
  } catch (err) {
    console.error(`Error generating test cases: ${err.message}`);
  }
};

module.exports = {
  readFile,
  saveFile,
  ensureDirectoryExistence,
  generateOpenAIResponse,
  generateCode,
  generateTestCases,
};
