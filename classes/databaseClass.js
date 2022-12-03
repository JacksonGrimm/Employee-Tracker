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
  returnTable(table) {
    this.db.query(`SELECT * FROM ${table}`, (err, data) => {
      err ? console.log(err) : console.log(data);
    });
  }
  //removing rows from data
  removeFromTable(table, id) {
    this.db.query(`DELETE FROM ${table} WHERE id = ${id}`, (err, data) => {
      err ? console.log(err) : console.log(data);
    });
  }
  addToTable(table, array) {
    // switch (table) {
    //   case "department":
    //     console.log("department");
    //     break;
    //   case "role":
    //     console.log("role");
    //     break;
    //}
    this.db.query(
      `INSERT INTO ${table}(name) VALUE (${JSON.stringify(array[0])})`,
      (err, data) => {
        err ? console.log(err) : console.log(data);
      }
    );
  }
}
//remove from table
//add to table

database = new DataBase();
database.addToTable("department", ["ART"]);
