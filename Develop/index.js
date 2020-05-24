const viewEmp = require("./lib/viewEmp");
const dept = require("./lib/dept");
const role = require("./lib/role");
const employee = require("./lib/employee");
const menu = require("./lib/mainMenu");
const connection = require("./db/db");

async function init() {
    console.log(" ")
    console.log("~~~ MAIN MENU ~~~")
    console.log(" ")
    try{
        menu.mainQuestion().then(answer => {
            switch(answer.mainMenu){
                case("View"):
                    viewEmp.getView();
                    break;
                case("Manage Department"):
                    dept.getDept();
                    break;
                case("Manage Roles"):
                    role.getRoles();
                    break;
                case("Manage Employees"):
                    employee.getEmployees();
                    break;
                default:
                    console.log("Thank You for using Employee Tracker..");
                    connection.end();
                    break;
            }
        })
    }catch(error){
        console.error(error);
    }
}

init();

exports.init = init; 