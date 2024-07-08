const express = require('express');
const app = express();
const cors = require("cors");
const mysql = require("mysql2"); 
const bodyParser = require('body-parser');


app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true })) 

const mydb = mysql.createConnection({
    host : "localhost",
    user : "root", 
    password : "qwer1234",   //로컬 db
    database : "insideout",  //로컬 db
    port : 3306
});


//http://localhost/:3333 에서 확인
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
      const resData = {
        id_post : res.id_post,
        id_user : res.id_user,
        title : res.title,
        body : res.body,
        anonymity : res.anonymity
      }
      // res.send(results);
      res.json(resData);
    });
  });

  app.post('/api/new', (req, res) => {
    const { id_user, title, body, anonymity } = req.body;
    //  const q = "insert into post(id_user, title, body, anonymity) VALUES (?, ?, ?, ?)";
     mydb.query( "insert into post(id_user, title, body, anonymity) VALUES (?, ?, ?, ?)"
      , [id_user, title, body, anonymity],(error, results, fields) => {
      if (error) {
        return res.status(500).send("쿼리 실행 실패: " + error.message);
      }
      console.log(res)
      res.send({
        id_post: result.insertId,
        id_user, 
        title, 
        body, 
        anonymity});
    });
  });

app.listen(3333, () => {
    console.log(`DB Server running`)
})

module.exports = mydb;