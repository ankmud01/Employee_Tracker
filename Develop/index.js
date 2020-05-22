const viewEmp = require("./lib/viewEmp")
const dept = require("./lib/dept")
const menu = require("./lib/mainMenu")
// const inquirer = require("inquirer")

async function init() {
    console.log("Asking Main menu Questions...")
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
                    getRoles();
                    break;
                case("Manage Employee"):
                    getEmployees();
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