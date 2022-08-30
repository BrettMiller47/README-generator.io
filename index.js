const fs = require('fs');
const inquirer = require('inquirer');

/**
 * Generates HTML according to a templated README.md file.
 * @param {string} title - application title
 * @param {string} description - application description
 * @param {string} logoSrc - relative path for the application's logo image
 * @param {string} featuredSrc - relative path for the application's preview screenshot or video
 * @param {string} installInstructions - Instructions to install the application
 * @param {string} usage - application usage information
 * @param {string} testInstructions - application test instructions
 * @param {string} license - application license
 * @param {string} githubName - author's GitHub username
 * @param {string} githubUrl - author's GitHub profile URL
 * @param {string} repoUrl - application's GitHub repository URL
 * @param {string} email - email address of application author
 * @returns README.md HTML content according to the parameters
 */
const generateHtml = ({title, description, logoSrc, featuredSrc, installInstructions, usage, testInstructions, contribution, license, githubName, githubUrl, repoUrl, email}) =>
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

<h1 align="center">
    <img src="${featuredSrc}" alt="README Generator">
</h1>

## How To Use

${usage}

## Installation Instructions

${installInstructions}

## Test Instructions

${testInstructions}

## Contributions
${contribution}

## License

${license}

---

> GitHub [${githubName}](${githubUrl})

> Email [${email}](${email})`;

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
            message: 'Enter test instructions: ',
            name: 'testInstructions'
        },
        {
            type: 'input',
            message: 'Enter contribution guidelines: ',
            name: 'contribution'
        },
        {
            type: 'list',
            message: 'Choose a license: ',
            name: 'license',
            choices: ['Apache 2.0', 'GNU General Public v3.0', 'MIT', 'BSD 2-Clause Simplified', 'BSD 3-Clause New or Revised', 'GNU Affero General Public v3.0', 'GNU General Public v2.0', 'Mozilla Public 2.0']
        },
        {
            type: 'input',
            message: 'Enter GitHub username: ',
            name: 'githubName'
        },
        {
            type: 'input',
            message: 'Enter GitHub profile url: ',
            name: 'githubUrl'
        },
        {
            type: 'input',
            message: 'Enter GitHub repository url: ',
            name: 'repoUrl'
        },
        {
            type: 'input',
            message: 'Enter email address: ',
            name: 'email'
        },
    ])
    .then((answers) => {
        
        // Convert the chosen license to markup
        let dictLicenseMarkup = {
            'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
            'GNU General Public v3.0': '[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)',
            'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
            'BSD 2-Clause Simplified': '[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)',
            'BSD 3-Clause New or Revised': '[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)',
            'GNU Affero General Public v3.0':'[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)',
            'GNU General Public v2.0':'[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://img.shields.io/badge/License-GPL%20v2-blue.svg)',
            'Mozilla Public 2.0':'[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)',
        }
        answers.license = dictLicenseMarkup[answers.license];

        // Generate the README.md htmlContent
        let htmlContent = generateHtml(answers);

        // Create the README.md file with the appropriate HTML content
        fs.writeFile('README.md', htmlContent, (err) =>
            err ? console.error(err) : console.log('README.md was created and is located in the current directory.')
        );
    });
    