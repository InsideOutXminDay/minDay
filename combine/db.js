const mysql = require('mysql2');
require('dotenv').config();

const mydb = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, //로컬 db
  database: process.env.insideout, //로컬 db
  port: process.env.DB_PORT
});

mydb.connect((err) => {
  if (err) console.log(err);
  else console.log('Connected to the database');
});

module.exports = mydb;
