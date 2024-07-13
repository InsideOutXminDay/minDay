const mysql = require('mysql2');

const mydb = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234', //로컬 db
  database: 'insideout', //로컬 db
  port: 3306,
});

mydb.connect((err) => {
  if (err) console.log(err);
  else console.log('Connected to the database');
});

module.exports = mydb;
