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

let utilizedBudget = "Select d.name AS Department_Name, sum(r.salary) AS Dept_Budget ";
    utilizedBudget += "from department d, role r, employee e ";
    utilizedBudget += "where d.id = r.dept_id ";
    utilizedBudget += "and e.role_id = r.id ";
    utilizedBudget += "group by d.name ";
    utilizedBudget += "order by 2 desc";

let viewRoles = "Select r.id AS ROLE_ID, r.title AS ROLE, r.salary AS SALARY, r.dept_id AS Department_Id, d.name AS Department_Name ";
    viewRoles += "from role r, department d ";
    viewRoles += "where r.dept_id = d.id ";
    viewRoles += "order by 1 ";

let addRole = "Insert into role (title, salary, dept_id) Values (?,?,?) ";

let updateRoleName = "UPDATE role SET title = ? WHERE id = ?;"
let updateSalary = "UPDATE role SET salary = ? WHERE id = ?;"
let reassignDepartment = "UPDATE role SET dept_id = ? WHERE id = ?;"
let removeRole = "DELETE FROM role WHERE id = (?)";

let viewEmpAll ="Select distinct(r.id) AS Role_Id, r.title AS Role, e.manager_id, CONCAT(e1.first_name,\" \",e1.last_name) AS Manager_Name ";
    viewEmpAll += "From employee e Join role r on e.role_id = r.id ";
    viewEmpAll += "left join employee e1 ";
    viewEmpAll += "on e.manager_id = e1.id";

let addEmp = "Insert into employee (first_name, last_name, role_id, manager_id) Values (?,?,?,?) ";

exports.allEmployeeQuery = allEmployeeQuery;
exports.empbyDept = empbyDept;
exports.empbyRole = empbyRole;
exports.empbyMgr = empbyMgr;
exports.viewDept = viewDept;
exports.removeDepartment = removeDepartment;
exports.addDepartment = addDepartment;
exports.utilizedBudget = utilizedBudget;
exports.viewRoles = viewRoles;
exports.addRole = addRole; 
exports.updateRoleName = updateRoleName;
exports.updateSalary = updateSalary;
exports.reassignDepartment = reassignDepartment;
exports.removeRole = removeRole;
exports.viewEmpAll = viewEmpAll;
exports.addEmp = addEmp;