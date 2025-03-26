const mysql = require("mysql2");

const config = {
  host: process.env.DBHOST || "",
  user: process.env.DBUSER || "",
  password: process.env.DBPASSWORD || "",
  database: process.env.DATABASE || "aireSano",
  port: process.env.DBPORT || 3306,
  dateStrings: true,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

const pool = mysql.createPool(config);

module.exports = pool;
