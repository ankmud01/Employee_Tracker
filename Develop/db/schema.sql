DROP DATABASE IF EXISTS officeDb;
CREATE database officeDb;

USE officeDb;

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role(
   id INT AUTO_INCREMENT PRIMARY KEY,
  title varchar(30) NOT NULL,
  salary decimal(9.2) NOT NULL,
  dept_id int NOT NULL,
  FOREIGN KEY (dept_id) 
  REFERENCES department(id)
  ON DELETE CASCADE
);

CREATE TABLE employee(
   id INT AUTO_INCREMENT PRIMARY KEY,
  first_name varchar(30) NOT NULL,
  last_name varchar(30) NOT NULL,
  role_id int NOT NULL,
  manager_id int,
  CONSTRAINT fk_role_id
  FOREIGN KEY (role_id) 
  REFERENCES role(id)
  ON DELETE CASCADE
);
