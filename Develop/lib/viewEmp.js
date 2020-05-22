const main = require("../index");
const inquirer = require("inquirer");
const connection = require("../db/db");
const myQuery = require("../db/query");
require('console.table');

const questions = [
    {
        type: 'list',
        name: 'viewMenu',
         message: 'How do you want to view employees?',
        choices: [
            "View all employees",
            "View employees by Department",
            "View employees by Roles",
            "View employees by Manager",
            "Main Menu"
        ]
    }
]

async function getView() {
    const viewQuestion = await inquirer.prompt(questions);
    switch (viewQuestion.viewMenu) {
        case ("View all employees"):
            viewEmp();
            break;
        case ("View employees by Department"):
            viewEmpbyDept();
            break;
        case ("View employees by Roles"):
            viewEmpbyRoles();
            break;
        case ("View employees by Manager"):
            viewEmpbyMgr();
            break;
        default:
            main.init();
            break;
    }
}

async function viewEmp() {
    let data = [];
    try {
        connection.query(myQuery.allEmployeeQuery, function (err, result) {
            console.log(result.length + " employees found!")
            result.forEach(res => {
                data.push([res.Employee_ID, res.Employee_Name, res.Role, res.Salary, res.Manager_Name])
            });
            console.log(" ");
            console.table(['Employee_ID', 'Employee_Name', 'Employee_Role', 'Salary', 'Manager_Name'], data);
            getView();
        })
    } catch (err) {
        console.error(err)
    }
}

async function viewEmpbyDept(){
    let data = [];
    try{
        connection.query(myQuery.empbyDept, function(err, result){
            console.log(result.length + " employees found!")
            result.forEach(res => {
                data.push([res.Employee_ID, res.Employee_Name, res.Department_Name])
            });
            console.log(" ");
            console.table(['Employee_ID', 'Employee_Name', 'Department_Name'], data);
            getView();
        })
    }catch(err){
        console.error(err)
    }
}

async function viewEmpbyRoles(){
    let data = [];
    try{
        connection.query(myQuery.empbyRole, function(err, result){
            console.log(result.length + " employees found!")
            result.forEach(res => {
                data.push([res.Employee_ID, res.Employee_Name, res.Department_Name, res.Role])
            });
            console.log(" ");
            console.table(['Employee_ID', 'Employee_Name', 'Department_Name', 'Role'], data);
            getView();
        })
    }catch(err){
        console.error(err)
    }
}

async function viewEmpbyMgr() {
    let data = [];
    try {
        connection.query(myQuery.empbyMgr, function (err, result) {
            console.log(result.length + " employees found!")
            result.forEach(res => {
                data.push([res.Employee_ID, res.Employee_Name, res.Role, res.Manager_Name])
            });
            console.log(" ");
            console.table(['Employee_ID', 'Employee_Name', 'Employee_Role', 'Manager_Name'], data);
            getView();
        })
    } catch (err) {
        console.error(err)
    }
}

exports.getView = getView;