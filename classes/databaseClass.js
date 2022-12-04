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
    this.db.query(`SELECT * FROM ${table}`, (err, data) => {
      if (err) {
        console.log(err);
      }
      console.log(" ");
      console.table(data);
    });
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
  async addToTable(table, array) {
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
        this.db.query(
          //looks like
          //INSERT INTO role(name) VALUE("name"))
          `INSERT INTO ${table}(name) VALUE (${JSON.stringify(...array)})`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            return data;
          }
        );
        break;
      case "employee":
        INCOMPLETE;
        this.db.query(
          //INSERT INTO role(name) VALUE("name"))
          `INSERT INTO ${table}(name) VALUE (${JSON.stringify(...array)})`,
          (err, data) => {
            if (err) {
              console.log(err);
              return;
            }
            return data;
          }
        );
        break;
    }
  }
}
//remove from table
//add to table

module.exports = DataBase;
