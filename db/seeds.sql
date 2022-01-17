INSERT INTO departments 
VALUES 
(2, "Communications"),
(3,"Engineering"),
(1, "Research"),
(4,"Sales");

INSERT INTO roles (title, salary, id, department_id)
VALUES
("Communications Coordinator", 30000, 1, 2),
("Lead Engineer", 50000, 2, 3),
("Lead Researcher", 60000, 3, 1),
("Sales Associate", 45000, 5, 4),
("Sales Manager", 80000, 4, 4);

--id won't auto increment, had to input myself --
INSERT INTO employee 
VALUES 
(1,"Sam", "Smith", 2, NULL),
(2,"Laura", "Key", 1, 2),
(3,"Melanie", "Pops", 4, 1),
(4, "Dan", "Long", 5, 1),
(5, "Max", "Forgoto", 3, 1);

SELECT * FROM departments;
SELECT * FROM roles; 
SELECT * FROM employee; 
