const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql2"); 

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));


const mydb = mysql.createConnection({
    host : "localhost",
    user : "root", 
    password : "qwer1234",   //로컬 db
    database : "insideout",  //로컬 db
    port : 3306
});


//127.0.0.1:3333 에서 확인
app.get("/", (req, res) => {
    res.json("hello this is the backend")
  })


  app.get("/api/post", (req, res) => {
    const { id_post, id_user, title, body, anonymity} = req.body;
    // const q = "select * from post";
    mydb.query("SELECT * from post", (error, results, fields) => {
      if (error) {
        return res.send("쿼리 실행 실패: " + error.message);
      }
      res.send(results);
    });
  });

app.listen(3333, () => {
    console.log(`DB Server running`)
})

module.exports = mydb;