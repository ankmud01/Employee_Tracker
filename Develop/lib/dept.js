const main = require("../index");
const inquirer = require("inquirer");
const connection = require("../db/db");
const myQuery = require("../db/query");
require('console.table');

const questions = {
    deptMainMenu:
        [
            {
                type: 'list',
                name: 'deptMenu',
                message: 'What would you like to do?',
                choices: [
                    "View Department",
                    "Add Department",
                    "Remove Department",
                    "View total utilized budget by department",
                    "Main Menu"
                ]
            }
        ],
    addNewDepartment:
        [
            {
                type: 'Input',
                name: 'addDepartment',
                message: 'Please enter name of the new Department',
                validate: function (value) {
                    var pass = value.match(/^[a-zA-Z ]+$/);
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid name';
                    }
                }
            }
        ],
    removeDepartment:
        [
            {
                type: 'list',
                name: 'removeDepartment',
                message: 'Please select a Department to remove'
            }
        ]
}


async function getDept() {
    const deptQuestion = await inquirer.prompt(questions.deptMainMenu);
    switch (deptQuestion.deptMenu) {
        case ("View Department"):
            viewDept();
            break;
        case ("Add Department"):
            addDept();
            break;
        case ("Remove Department"):
            removeDept();
            break;
        case ("View total utilized budget by department"):
            deptBudget();
            break;
        default:
            main.init();
            break;
    }
}

async function viewDept() {
    let data = [];
    try {
        connection.query(myQuery.viewDept, function (err, result) {
            // console.log(result.length + " employees found!")
            result.forEach(res => {
                data.push([res.id, res.name])
            });
            console.log(" ");
            console.table(['Department_ID', 'Department_Name'], data);
            getDept();
        })
    } catch (err) {
        console.error(err)
    }
}

async function addDept() {
    const addNewDepartment = await inquirer.prompt(questions.addNewDepartment)
    console.log(addNewDepartment.addDepartment)
    try {
        connection.query(myQuery.addDepartment, addNewDepartment.addDepartment, function (err, result) {
            if (err) throw err;
            console.log(` New Department "${addNewDepartment.addDepartment}" added successfully!!!`)
            console.log(" ")
            viewDept();
        })
    } catch (err) {
        console.error(err)
    }
}

async function removeDept() {
    connection.query(myQuery.viewDept, function (err, result) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'removeDepartment',
                    message: 'Please select a Department to remove',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.id} ${res.name}`)
                        })
                        return choiceArray;
                    }
                }
            ])
            .then(answer =>{
                const data = (answer.removeDepartment);
                let dataArr = data.split(" ")
                const dept2Remove = parseInt(dataArr[0]);
                
                try {
                    connection.query(myQuery.removeDepartment, dept2Remove, function (err, result) {
                        if (err) throw err;
                        console.log(` Department successfully Removed!!!`)
                        console.log(" ")
                        viewDept();
                    })
                } catch (err) {
                    console.error(err)
                }
            })
    })
}

exports.getDept = getDept;