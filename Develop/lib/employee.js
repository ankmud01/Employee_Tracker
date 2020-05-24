const main = require("../index");
const inquirer = require("inquirer");
const connection = require("../db/db");
const myQuery = require("../db/query");
const view = require("./viewEmp")
require('console.table');

const questions = {
    employeeMainMenu:
        [
            {
                type: 'list',
                name: 'employeeMenu',
                message: 'What would you like to do?',
                choices: [
                    "Add Employee",
                    "Remove Employee",
                    "Main Menu"
                ]
            }
        ]
} 

async function getEmployees(){
    const employeeQuestion = await inquirer.prompt(questions.employeeMainMenu);
    switch (employeeQuestion.employeeMenu) {
        case ("Add Employee"):
            addEmployee();
            break;
        case ("Remove Employee"):
            removeEmployee();
            break;
        default:
            main.init();
            break;
    }
}

async function addEmployee() {
    connection.query(myQuery.viewEmpAll, function (err, result) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    type: 'Input',
                    name: 'empFirstName',
                    message: 'Please enter first name of the new employee - ',
                    validate: function (value) {
                        var pass = value.match(/^[a-zA-Z ]+$/);
                        if (pass) {
                            return true;
                        } else {
                            return 'Please enter a valid name';
                        }
                    }
                },
                {
                    type: 'Input',
                    name: 'empLastName',
                    message: 'Please enter last name of the new employee - ',
                    validate: function (value) {
                        var pass = value.match(/^[a-zA-Z ]+$/);
                        if (pass) {
                            return true;
                        } else {
                            return 'Please enter a valid name';
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'empRole',
                    message: 'Please select a Role for the new employee - ',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.Role_Id} || ${res.Role}`)
                        })
                        return choiceArray;
                    }
                },
                {
                    type: 'list',
                    name: 'empDept',
                    message: 'Please select a Manager for the new employee - ',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.manager_id} ${res.Manager_Name}`)
                        })
                        return choiceArray;
                    }
                }
            ])
            .then(answer => {
                const firstName = answer.empFirstName;
                const lastName = answer.empLastName;
                const empdata = answer.empRole
                let empdataArr = empdata.split(" ")
                const empRole = parseInt(empdataArr[0])
                const data = (answer.empDept);
                let dataArr = data.split(" ")
                const empManager = parseInt(dataArr[0])
                    ;

                try {
                    connection.query(myQuery.addEmp, [firstName, lastName, empRole, empManager ], function (err, result) {
                        if (err) throw err;
                        console.log(" ")
                        console.log(`${firstName} ${lastName} successfully added as a new employee..`)
                        console.log(" ")
                        getEmployees();
                    })
                } catch (err) {
                    console.error(err)
                }
            })
    })
}
exports.getEmployees = getEmployees;