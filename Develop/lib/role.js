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
            updateRoleAttributes();
            break;
        case ("Remove Role"):
            removeRole();
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

async function updateRoleAttributes() {
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err;
        inquirer.prompt(
            [
                {
                    type: 'list',
                    name: 'updatChoice',
                    message: 'Please select an action - ',
                    choices: ["Update Role_Title", "Update Salary", "ReassignDepartment", "Back to Update Menu"]
                }
            ])
            .then(answer => {
                const updateRoleChoice = answer.updatChoice;
                // console.log(updateRoleChoice);
                switch (updateRoleChoice) {
                    case ("Update Role_Title"):
                        newRoleName();
                        break;
                    case ("Update Salary"):
                        updateRoleSalary();
                        break;
                    case ("ReassignDepartment"):
                        updateRoleDepartment()
                        break;
                    default:
                        viewRoles();
                        break;
                }
            })
    })
}

async function newRoleName() {
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateList',
                message: 'Please select a role title you want to update',
                choices: function () {
                    let choiceArray = []
                    result.forEach(res => {
                        choiceArray.push(`${res.ROLE_ID} || ${res.ROLE}`)
                    })
                    return choiceArray;
                }
            },
            {
                type: 'Input',
                name: 'newRoleName',
                message: 'Please enter the updated role name to be - ',
                validate: function (value) {
                    var pass = value.match(/^[a-zA-Z ]+$/);
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid name';
                    }
                }
            }
        ])
            .then(answer => {
                console.log(answer.updateList);
                const newName = answer.newRoleName;
                const data = (answer.updateList);
                let dataArr = data.split(" ")
                const roleid2update = parseInt(dataArr[0]);
                // console.log("role_id " + roleid2update);
                try {
                    connection.query(myQuery.updateRoleName, [newName, roleid2update], function (err, result) {
                        if (err) throw err;
                        console.log(`"Role Title has been sucessfully changed to "${newName}"`)
                        console.log(" ")
                        viewRoles();;
                    })
                } catch (err) {
                    console.error(err)
                };
            })
    })
}

async function updateRoleSalary() {
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err;
        inquirer.prompt([
            {
                type: 'list',
                name: 'updateList',
                message: 'Please select a role title whose salary you want to update',
                choices: function () {
                    let choiceArray = []
                    result.forEach(res => {
                        choiceArray.push(`${res.ROLE_ID} || ${res.ROLE} || ${res.SALARY}`)
                    })
                    return choiceArray;
                }
            },
            {
                type: 'Input',
                name: 'newSalary',
                message: 'Please enter updated salary for this role',
                validate: function (value) {
                    var pass = value.match(/^[1-9]\d*(\.\d+)?$/);
                    if (pass) {
                        return true;
                    } else {
                        return 'Please enter a valid amount';
                    }
                }
            }
        ])
            .then(answer => {
                console.log(answer.updateList);
                const newSalary = answer.newSalary;
                const data = (answer.updateList);
                let dataArr = data.split(" ")
                const salaryid2update = parseInt(dataArr[0]);
                // console.log("role_id " + roleid2update);
                try {
                    connection.query(myQuery.updateSalary, [newSalary, salaryid2update], function (err, result) {
                        if (err) throw err;
                        console.log(`"Salary Amount has been sucessfully changed to $ ${newSalary}`)
                        console.log(" ")
                        viewRoles();;
                    })
                } catch (err) {
                    console.error(err)
                };
            })
    })
}

async function updateRoleDepartment() {
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err

        inquirer.prompt([
            {
                type: 'list',
                name: 'updateList',
                message: 'Please select a role title whose whose department you want to reassign',
                choices: function () {
                    let choiceArray = []
                    result.forEach(res => {
                        choiceArray.push(`${res.ROLE_ID} - Role_ID || ${res.ROLE} || ${res.Department_Id} - Dept_ID || ${res.Department_Name}`)
                    })
                    return choiceArray;
                }
            },
            {
                type: 'list',
                name: 'reassignDeptid',
                message: 'Please select a department you want the role to be reassigned to',
                choices: function () {
                    let choiceArray = []
                    result.forEach(res => {
                        choiceArray.push(`${res.Department_Id} - Dept_ID || ${res.Department_Name}`)
                    })
                    return choiceArray;
                }
            }
        ])
            .then(answer => {
                const data = (answer.updateList);
                let dataArr = data.split(" ")
                const dept2update = parseInt(dataArr[0]);
                const newDeptData = answer.reassignDeptid;
                let newDeptDataArr = newDeptData.split(" ");
                const newDeptId = parseInt(newDeptDataArr[0]);
                // console.log("role_id " + roleid2update);
                try {
                    connection.query(myQuery.reassignDepartment, [newDeptId, dept2update], function (err, result) {
                        if (err) throw err;
                        console.log(`"Department has been sucessfully ressigned to $ ${newDeptDataArr[2]}`)
                        console.log(" ")
                        viewRoles();;
                    })
                } catch (err) {
                    console.error(err)
                };
            })
    })
}

async function removeRole() {
    connection.query(myQuery.viewRoles, function (err, result) {
        if (err) throw err
        inquirer
            .prompt([
                {
                    type: 'list',
                    name: 'removeRole',
                    message: 'Please select a Role to remove',
                    choices: function () {
                        let choiceArray = []
                        result.forEach(res => {
                            choiceArray.push(`${res.ROLE_ID} || ${res.ROLE}`)
                        })
                        return choiceArray;
                    }
                }
            ])
            .then(answer => {
                const data = (answer.removeRole);
                let dataArr = data.split(" ")
                const role2Remove = parseInt(dataArr[0]);

                try {
                    connection.query(myQuery.removeRole, role2Remove, function (err, result) {
                        if (err) throw err;
                        console.log(`Role has been successfully Removed!!!`)
                        console.log(" ")
                        viewRoles();
                    })
                } catch (err) {
                    console.error(err)
                }
            })
    })
}
exports.getRoles = getRoles;