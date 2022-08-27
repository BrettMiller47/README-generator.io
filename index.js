const inquirer = require('inquirer');

inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter project name: ',
            name: 'projectName'
        },
    ])
    .then((response) => {
        // each prompt's answers are accessible via response.name
        
    });
    