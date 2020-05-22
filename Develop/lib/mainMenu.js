const inquirer = require("inquirer");

function mainQuestion(){
    return inquirer.prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'What would you like to do?',
            choices: [
                "View",
                "Manage Department",
                "Manage Roles",
                "Manage Employees",
                "Quit Program"
            ]
        }
    ])
};

exports.mainQuestion = mainQuestion;