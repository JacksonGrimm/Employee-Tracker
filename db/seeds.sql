INSERT INTO department(name) VALUE("IT");
INSERT INTO department(name) VALUE("HR");

INSERT INTO role(title, salary, department_id) VALUE("Dev", 100000, 1),("Consultant", 90000, 2);
INSERT INTO employee(first_name, last_name, role_id) VALUE("Jackson", "Grimm", 1);
