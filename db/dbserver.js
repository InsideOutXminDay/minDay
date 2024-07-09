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
  host: "localhost",
  user: "root",
  password: "1234",   //로컬 db
  database: "insideout",  //로컬 db
  port: 3306
});


//http://localhost/:3333 에서 확인
app.get("/", (req, res) => {
  res.json("hello this is the backend")
})


app.get("/api/post", (req, res) => {
  mydb.query("SELECT * from post", (error, results) => {
    if (error) {
      return res.send("쿼리 실행 실패: " + error.message);
    }
    res.json(results);
  });
});

app.get("/api/comment", (req, res) => {
  mydb.query("SELECT * from comment", (error, results) => {
    if (error) {
      return res.send("쿼리 실행 실패: " + error.message);
    }
    res.json(results);
  });
});

app.get("/api/user", (req, res) => {
  mydb.query("SELECT * from user", (error, results) => {
    if (error) {
      return res.send("쿼리 실행 실패: " + error.message);
    }
    res.json(results);
  });
});


app.post("/api/new", (req, res) => {
  const { id_user, title, body, anonymity } = req.body;
  const q = "insert into post(id_user, title, body, anonymity) VALUES (?,?,?,?);"
  mydb.query(q
    , [id_user, title, body, anonymity], (error, results) => {
      if (error) {
        return res.status(500).send("쿼리 실행 실패: " + error.message);
      }
      res.json(results);
    });
});

app.post("/api/comment", (req, res) => {
  const { id_comment, body, id_user, id_post } = req.body;
  const q = "insert into comment(id_comment, body, id_user, id_post) VALUES (?,?,?,?);"
  mydb.query(q
    , [id_comment, body, id_user, id_post], (error, results) => {
      if (error) {
        return res.status(500).send("쿼리 실행 실패: " + error.message);
      }
      res.json(results);
    });
});


app.listen(3333, () => {
  console.log(`DB Server running`)
})

module.exports = mydb;