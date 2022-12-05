const mysql = require("mysql2");
//dataBase connection
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "root",
    database: "company_db",
  },
  console.log(`Connected to the company_db; database.`)
);

//class
class DataBase {
  constructor() {
    this.db = db;
  }
  //it returns the table from database
  async getTable(table) {
    switch (table) {
      case "department":
        this.db.query(
          //looks like
          //INSERT INTO department(name) VALUE("name"))
          `SELECT * FROM department`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("");
            console.table(data);
          }
        );
        break;
      case "role":
        this.db.query(
          //looks like
          //INSERT INTO department(name) VALUE("name"))
          `SELECT * FROM role
          INNER JOIN department
          ON role.department_id = department.id;`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("");
            console.table(data);
          }
        );
        break;
      case "employee":
        this.db.query(
          //looks like
          //INSERT INTO department(name) VALUE("name"))
          `SELECT * FROM employee
          INNER JOIN role
          ON employee.role_id = role.role_id;`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            console.log("");
            console.table(data);
          }
        );
    }
  }
  //removing rows from data
  // async removeFromTable(table, id) {
  //   this.db.query(`DELETE FROM ${table} WHERE name=${id}`, (err, data) => {
  //     if (err) {
  //       console.log(err);
  //       return;
  //     }
  //     console.log(data);
  //   });
  //}
  async addToTable(table, array, hasManager) {
    //switch statement to check for different tables
    switch (table) {
      case "department":
        this.db.query(
          //looks like
          //INSERT INTO department(name) VALUE("name"))
          `INSERT INTO ${table}(name) VALUE (${JSON.stringify(...array)})`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
          }
        );
        break;
      case "role":
        //INCOMPLETE
        let mySQlLineRole = `INSERT INTO ${table}(title,salary,department_id) VALUE (${JSON.stringify(
          array[0]
        )},${array[1]},${array[2]})`;
        this.db.query(mySQlLineRole, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          return data;
        });
        break;
      case "employee":
        let mySQlLineEmployee = "";
        if (hasManager) {
          mySQlLineEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUE (${JSON.stringify(
            array[0]
          )},${JSON.stringify(array[1])},${array[2]},${array[3]})`;
        } else {
          mySQlLineEmployee = `INSERT INTO ${table}(first_name,last_name,role_id) VALUE (${JSON.stringify(
            array[0]
          )},${JSON.stringify(array[1])},${array[2]})`;
        }
        this.db.query(mySQlLineEmployee, (err, data) => {
          if (err) {
            console.log(err);
            return;
          }
          return data;
        });
        break;
    }
  }
}
//remove from table
//add to table

module.exports = DataBase;
