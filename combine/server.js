const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require('body-parser');
const session = require('express-session');
// setting 
const fs = require('fs');
const path = require('path');
const port = 4000; //proxy도 4000으로 해둠
// db 
const mydb = require('./back.combine.db.js');

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//session
app.use(
    session({
        secret: 'test',
        resave: false,
        saveUninitialized: true,
    })
);

// setting feat
const userDataPath = path.join(__dirname, '../settingserver/userdata.json');

//////////////////////////// login feat ////////////////////////////////
const loggedInUser = [];

//추후 DB연결로 빼야함
const userInfo = [
    {
      id: 1,
      userId: 'abc3085',
      pw: '1234',
      nickname: '짱구',
      email: 'abc3085@naver.com',
    },
    {
      id: 2,
      userId: 'happy2',
      pw: '5678',
      nickname: '철수',
      email: 'happy2@gami.com',
    },
    {
      id: 3,
      userId: 'mulcam5',
      pw: '91011',
      nickname: '유리',
      email: 'mulcam5@daum.net',
    },
    {
      id: 4,
      userId: 'candy99',
      pw: '98765',
      nickname: '맹구',
      email: 'candy99@naver.com',
    },
    {
      id: 5,
      userId: 'react5',
      pw: '9981',
      nickname: '훈이',
      email: 'react5@gamil.com',
    },
  ];


//로그인 시 GET, POST 요청/응답
app.get('/api/login', (req, res) => {
    res.send(loggedInUser);
});
app.post('/api/login', (req, res) => {
    const { userId, pw } = req.body;
    const user = userInfo.filter((user) => user.userId === userId);
    const id = user[0].id;
    if (user.length === 0) {
        res.status(400);
        res.send('가입되지 않은 회원');
        return;
    }
    if (user[0].pw !== pw) {
        res.status(400);
        res.send('비밀번호가 일치하지 않음');
        return;
    }
    loggedInUser.push({ id, userId });
    //session에 로그인 정보 저장
    req.session.user = {
        loggedIn: true,
        id,
        userId,
    };
    console.log(req.sessionID);
    console.log(req.session);
    res.status(200).send('로그인 성공');
});

//회원가입 시 POST 요청/응답
app.post('/api/signup', (req, res) => {
    const { userId, pw, nickname, email } = req.body;
    userInfo.push({ id: id++, userId, pw, nickname, email });
    return res.send('회원가입 성공');
});

//회원가입 됐는지 확인용 GET요청/응답
app.get('/api/users', (req, res) => {
    res.send(userInfo);
});


//////////////////////////// setting feat ////////////////////////////////
app.get('/user', (req, res) => {
    fs.readFile(userDataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '오류 발생' });
        }
        res.json(JSON.parse(data));
    });
});

app.put('/user', (req, res) => {
    const { id, nickname, email, currentPassword, newPassword } = req.body;

    fs.readFile(userDataPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: '오류 발생' });
        }

        const userData = JSON.parse(data);

        if (currentPassword !== userData.password) {
            return res.status(400).json({ error: '비밀번호가 올바르지 않습니다.' });
        }
        userData.id = id;
        userData.nickname = nickname;
        userData.email = email;
        userData.password = newPassword;

        fs.writeFile(userDataPath, JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: '오류 발생' });
            }
            res.json(userData);
        });
    });
});

//////////////////////////// community feat ////////////////////////////////



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

app.get("/api/postuser", (req, res) => {
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

app.post("/api/edit", (req, res) => {
    const { title, body, id_post } = req.body;
    const q = "update post set title = ?, body = ? WHERE id_post = ?;"
    mydb.query(q
        , [title, body, id_post], (error, results) => {
            if (error) {
                return res.status(500).send("쿼리 실행 실패: " + error.message);
            }
            res.json(results);
        });
});

app.post("/api/delete", (req, res) => {
    const { id_post, id_comment } = req.body;
    const q = "delete from comment where id_post = ? && id_comment = ?;"
    mydb.query(q
        , [id_post, id_comment], (error, results) => {
            if (error) {
                return res.status(500).send("쿼리 실행 실패: " + error.message);
            }
            res.json(results);
        });
});


//////////////////////////// foot ////////////////////////////////

//http://localhost/:4000 에서 확인
app.get("/", (req, res) => {
    res.json("hello this is the backend")
})

app.listen(4000, () => {
    console.log(`BE Server running`)
})
