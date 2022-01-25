INSERT INTO departments (department_id, department_name)
VALUES (2, "Communications"),
INSERT INTO departments (department_id, department_name)
VALUES (3,"Engineering"),
INSERT INTO departments (department_id, department_name)
VALUES (1, "Research"),
INSERT INTO departments (department_id, department_name)
VALUES (4,"Sales");

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

--id won't auto increment, had to input myself --
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (1,"Sam", "Smith", 2, NULL),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (2,"Laura", "Key", 1, 2),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (3,"Melanie", "Pops", 4, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES (4, "Dan", "Long", 5, 1),
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES(5, "Max", "Forgoto", 3, 1);

SELECT * FROM departments;
SELECT * FROM roles; 
SELECT * FROM employee; 
