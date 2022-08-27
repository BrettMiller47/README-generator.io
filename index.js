const fs = require('fs');
const inquirer = require('inquirer');

/**
 * Generates HTML according to a templated README.md file.
 * @param {string} title - application title
 * @param {string} description - application description
 * @param {string} logoSrc - source path for the application's logo image
 * @param {string} featuredSrc - source path for the application's preview screenshot or video
 * @param {string} installInstructions - Instructions to install the application
 * @param {string} usage - application usage information
 * @param {string} contribution - application contribution information
 * @param {string} license - application license
 * @param {string} githubName - author's GitHub username
 * @param {string} githubUrl - author's GitHub profile URL
 * @param {string} repoUrl - application's GitHub repository URL
 * @param {string} repoName - application's repository name
 * @param {string} email - email address of application author
 * @returns README.md HTML content according to the parameters
 */
const generateHtml = ({title, description, logoSrc, featuredSrc, installInstructions, usage, contributions, testInstructions, license, githubName, githubUrl, repoUrl, repoName, email}) =>
    `<h1 align="center">
  <br>
  <a href="${repoUrl}"><img src="${logoSrc}" alt="${title}" width="200"></a>
  <br>
  ${title}
  <br>
</h1>

<h4 align="center">${description}</h4>

<p align="center">
  <a href="#how-to-use">How To Use</a> •
  <a href="#installation-instructions">Installation Instructions</a> •
  <a href="#test-instructions">Test Instructions</a>
</p>

![screenshot](${featuredSrc})

## How To Use

${usage}

## Installation Instructions

${installInstructions}

## Test Instructions

${testInstructions}

## License

MIT

---

> GitHub [${githubName}](${githubUrl})

> Email [${email}](${email})
`;

inquirer
    //title, description, installation instructions, usage information, contribution guidelines, and test instructions
    .prompt([
        {
            type: 'input',
            message: 'Enter project title: ',
            name: 'title'
        },
        {
            type: 'input',
            message: 'Enter description: ',
            name: 'description'
        },
        {
            type: 'input',
            message: 'Enter src path for logo image: ',
            name: 'logoSrc'
        },
        {
            type: 'input',
            message: 'Enter src path for the featured image or video: ',
            name: 'featuredSrc'
        },
        {
            type: 'input',
            message: 'Enter installation instructions: ',
            name: 'installInstructions'
        },
        {
            type: 'input',
            message: 'Enter usage information: ',
            name: 'usage'
        },
        {
            type: 'input',
            message: 'Enter contribution guidelines: ',
            name: 'contributions'
        },
        {
            type: 'input',
            message: 'Enter test instructions: ',
            name: 'testInstructions'
        },
        {
            type: 'list',
            message: 'Choose a license: ',
            name: 'license',
            choices: ['MIT', 'Apache 2.0']
        },
        {
            type: 'input',
            message: 'Enter GitHub username: ',
            name: 'githubName'
        },
        {
            type: 'input',
            message: 'Enter GitHub repository name: ',
            name: 'repoName'
        },
        {
            type: 'input',
            message: 'Enter email address: ',
            name: 'email'
        },
    ])
    .then((answers) => {

        const githubUrl = 'https://github.com/' + answers.githubName;
        const repoUrl = githubUrl + '/' + answers.repoName;
        
        let htmlContent = generateHtml(answers);
        fs.writeFile('README.md', htmlContent, (err) =>
            err ? console.error(err) : console.log('README.md was created!')
        );
    });
    