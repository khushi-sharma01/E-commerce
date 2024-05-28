var mysql = require("mysql");
var pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Khushi@123",
  database: "medbazzar",
  multipleStatements: true,
});
module.exports = pool;
