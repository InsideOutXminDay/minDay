const mysql = require('mysql2');
require('dotenv').config({ path: '../.env' });

const mydb = mysql.createConnection({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD, 
  database: process.env.REACT_APP_DB_DATABASE, 
  port: process.env.REACT_APP_DB_PORT
});

const pool = mysql.createPool({
  host: process.env.REACT_APP_DB_HOST,
  user: process.env.REACT_APP_DB_USER,
  password: process.env.REACT_APP_DB_PASSWORD, 
  database: process.env.REACT_APP_DB_DATABASE, 
  port: process.env.REACT_APP_DB_PORT
});

mydb.connect((err) => {
  if (err) console.log(err);
  else console.log('Connected to the database');
});

module.exports = mydb;
