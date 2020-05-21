/*
Data insert query
*/
INSERT INTO department (name) VALUES ("Sales");
INSERT INTO department (name) VALUES ("Engineering");
INSERT INTO department (name) VALUES ("Finance");
INSERT INTO department (name) VALUES ("Legal");
INSERT INTO role (title, salary, dept_id) VALUES ("Sales Lead", 120500, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Sales Person", 91100, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Intern", 48934, 1);
INSERT INTO role (title, salary, dept_id) VALUES ("Lead Engineer", 189000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Software Engineer", 130000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("Junior Enigineer", 89000, 2);
INSERT INTO role (title, salary, dept_id) VALUES ("CPA", 142000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Accountant", 96000, 3);
INSERT INTO role (title, salary, dept_id) VALUES ("Legal Team Lead", 210000, 4);
INSERT INTO role (title, salary, dept_id) VALUES ("Lawyer", 187000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Jim", "Crosby", 1,10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bill", "Haley", 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Celine", "Dion", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bryan", "Adams", 3, 2);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Witney", "Houston", 5, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pink", "Floyd", 5, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Elton", "John", 4, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Eminem", "Shady", 6, 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Usher", "Smith", 6, 7);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Procol", "Harum", 7);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bee", "Gees", 8, 10);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Kim", "Carnes", 8, 10);
INSERT INTO employee (first_name, last_name, role_id) VALUES ("Paul", "Diddy", 9);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("John", "Travolta", 10, 13);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Michael", "Jackson", 10, 13);

/*
Query to view Employee Name, Role, Salary and Manager Name
*/
Select 
CONCAT(e.first_name," ",e.last_name) AS Employee_Name,
r.title AS Role,
r.salary AS Salary,
CONCAT(e1.first_name," ",e1.last_name) AS Manager_Name
From employee e
Join role r
on e.role_id = r.id
left join employee e1
on e.manager_id = e1.id;


/*
Query to Update employee roles
*/
UPDATE role_id FROM employee SET role_id as <User_Input> where id = <User_Input>;

/*
Query to update employees managers
*/
UPDATE role_id FROM employee SET manager_id as <User_Input> where id = <User_Input>;

