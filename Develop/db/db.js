const mysql = require("mysql");
require("dotenv/config");

//Setting SQL Connection
const connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: `${process.env.password}`,
    database: "officeDb"
});

module.exports = connection;