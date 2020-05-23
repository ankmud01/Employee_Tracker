const main = require("../index");
const inquirer = require("inquirer");
const connection = require("../db/db");
const myQuery = require("../db/query");
require('console.table');

const questions = {
    roleMainMenu:
        [
            {
                type: 'list',
                name: 'roleMenu',
                message: 'What would you like to do?',
                choices: [
                    "View Roles",
                    "Add Roles",
                    "Update Role",
                    "Remove Role",
                    "Main Menu"
                ]
            }
        ]
}

async function getRoles() {
    const deptQuestion = await inquirer.prompt(questions.roleMainMenu);
    switch (deptQuestion.roleMenu) {
        case ("View Roles"):
            viewRoles();
            break;
        case ("Add Roles"):
            addRoles();
            break;
        case ("Update Role"):
            updateRoles();
            break;
        case ("Remove Role"):
            removeRoles();
            break;
        default:
            main.init();
            break;
    }
}

async function viewRoles() {
    let data = [];
    try {
        connection.query(myQuery.viewRoles, function (err, result) {
            result.forEach(res => {
                data.push([res.ROLE_ID, res.ROLE, res.SALARY, res.Department_Id, res.Department_Name])
            });
            console.log(" ");
            console.table(['Role_ID', 'Role', 'Salary', 'Dept_Id', 'Dept_Name'], data);
            getRoles();
        })
    } catch (err) {
        console.error(err)
    }
}

async function addRoles() {
    connection.query(myQuery.viewDept, function (err, result) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    type: 'Input',
                    name: 'addRoleName',
                    message: 'Please enter name of the new Role - ',
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
                    name: 'addSalary',
                    message: 'Please enter salary for the new Role - ',
                    validate: function (value) {
                        var pass = value.match(/^[1-9]\d*(\.\d+)?$/);
                        if (pass) {
                            return true;
                        } else {
                            return 'Please enter a valid name';
                        }
                    }
                },
                {
                    type: 'list',
                    name: 'selectDept',
                    message: 'Please select a Department for the new Role - ',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.id} ${res.name}`)
                        })
                        return choiceArray;
                    }
                }
            ])
            .then(answer => {
                const data = (answer.selectDept);
                let dataArr = data.split(" ")
                const dept2Add = parseInt(dataArr[0])
                ;

                try {
                    connection.query(myQuery.addRole, [answer.addRoleName, answer.addSalary, dept2Add], function (err, result) {
                        if (err) throw err;
                        console.log(" ")
                        console.log(` Role "${answer.addRoleName}" successfully Added to "${dataArr[1]}" department!!!`)
                        console.log(" ")
                        viewRoles();
                    })
                } catch (err) {
                    console.error(err)
                }
            })
    })
}

async function updateRoles(){
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'updateList',
                    message: 'Please select a role you want to update',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.ROLE_ID} || ${res.ROLE} || ${res.SALARY} || ${res.Department_Id} || ${res.Department_Name }`)
                        })
                        return choiceArray;
                    }
                },
                {
                    type: 'list',
                    name: 'updatChoice',
                    message: 'Please select an attribute to update for this Role - ',
                    choices: ["Role_Title", "Salary", "Department"]
                }
            ])
            .then(answer => {
                console.log("Update the Role...")
            })
    })
}

exports.getRoles = getRoles;