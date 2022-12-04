INSERT INTO department(name) VALUE("IT");
INSERT INTO department(name) VALUE("HR");

INSERT INTO role(title, salary, department_id) VALUE("Dev", 100000, 1),("Consultant", 90000, 2);
INSERT INTO employee(first_name, last_name, role_id) VALUE("Jackson", "Grimm", 1);



SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

-- Joins role and department
SELECT * FROM role
INNER JOIN department
ON role.department_id = department.id;