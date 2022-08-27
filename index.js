const inquirer = require('inquirer');

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
            message: 'Enter installation instructions: ',
            name: 'install'
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
            name: 'test'
        },
        {
            type: 'list',
            message: 'Choose a license: ',
            name: 'license'
        },
        {
            type: 'input',
            message: 'Enter GitHub username: ',
            name: 'github'
        },
        {
            type: 'input',
            message: 'Enter email address: ',
            name: 'email'
        },
    ])
    .then((response) => {
        // each prompt's answers are accessible via response.name
        
    });
    