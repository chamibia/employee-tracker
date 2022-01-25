INSERT INTO departments (department_name)
VALUES ("Communications"),
INSERT INTO departments (department_name)
VALUES ("Engineering"),
INSERT INTO departments (department_name)
VALUES ("Research"),
INSERT INTO departments (department_name)
VALUES ("Sales");

INSERT INTO roles (title, salary, id, department_id)
VALUES ("Communications Coordinator", 30000, 1, 2),
INSERT INTO roles (title, salary, id, department_id)
VALUES ("Lead Engineer", 50000, 2, 3),
INSERT INTO roles (title, salary, id, department_id)
VALUES ("Lead Researcher", 60000, 3, 1),
INSERT INTO roles (title, salary, id, department_id)
VALUES ("Sales Associate", 45000, 5, 4),
INSERT INTO roles (title, salary, id, department_id)
VALUES ("Sales Manager", 80000, 4, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Sam", "Smith", 2, NULL),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Laura", "Key", 1, 2),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Melanie", "Pops", 4, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dan", "Long", 5, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES("Max", "Forgoto", 3, 1);

SELECT * FROM departments;
SELECT * FROM roles; 
SELECT * FROM employee; 
