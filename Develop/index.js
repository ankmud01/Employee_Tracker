require("dotenv/config");
const mysql = require("mysql");
const inquirer = require("inquirer");


//Setting SQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: `${process.env.password}`,
    database: "officeDb"
});

connection.connect(err =>{
    console.log(`connected to ${connection.threadId}`)
    if(err) throw err;
    init(); 
});

function init(){
    console.log("Hello Ankit")
    //This is where I will ask the main question using inquirer
    //Use switch function to move into different function as per user selection
};