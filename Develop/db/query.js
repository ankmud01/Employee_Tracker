let allEmployeeQuery = "Select e.id AS Employee_ID, CONCAT(e.first_name,\" \",e.last_name) AS Employee_Name,r.title AS Role, ";
    allEmployeeQuery += "r.salary AS Salary,CONCAT(e1.first_name,\" \",e1.last_name) AS Manager_Name ";
    allEmployeeQuery += "From employee e ";
    allEmployeeQuery += "Join role r ";
    allEmployeeQuery += "on e.role_id = r.id ";
    allEmployeeQuery += "left join employee e1 ";
    allEmployeeQuery += "on e.manager_id = e1.id";

let empbyDept = "Select e.id AS Employee_ID, CONCAT(e.first_name,\" \",e.last_name) AS Employee_Name, d.name AS Department_Name ";
    empbyDept += "From employee e, role r, department d ";
    empbyDept += "Where e.role_id = r.id ";
    empbyDept += "and r.dept_id = d.id ";
    empbyDept += "order by e.id";

let empbyRole = "Select e.id AS Employee_ID, CONCAT(e.first_name,\" \",e.last_name) AS Employee_Name, d.name AS Department_Name, r.title AS Role ";
    empbyRole += "From employee e, role r, department d ";
    empbyRole += "Where e.role_id = r.id ";
    empbyRole += "and r.dept_id = d.id ";
    empbyRole += "order by e.id";

let empbyMgr = "Select e.id AS Employee_ID, CONCAT(e.first_name,\" \",e.last_name) AS Employee_Name,r.title AS Role, ";
    empbyMgr += "CONCAT(e1.first_name,\" \",e1.last_name) AS Manager_Name ";
    empbyMgr += "From employee e ";
    empbyMgr += "Join role r ";
    empbyMgr += "on e.role_id = r.id ";
    empbyMgr += "left join employee e1 ";
    empbyMgr += "on e.manager_id = e1.id";

let viewDept = "Select id, name from Department order by id";
let addDepartment = "INSERT INTO Department (name) VALUES (?)";
let removeDepartment = "DELETE FROM department WHERE id = (?)";


exports.allEmployeeQuery = allEmployeeQuery;
exports.empbyDept = empbyDept;
exports.empbyRole = empbyRole;
exports.empbyMgr = empbyMgr;
exports.viewDept = viewDept;
exports.removeDepartment = removeDepartment;
exports.addDepartment = addDepartment;