const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
// setting
const fs = require('fs');
const path = require('path');
const port = 4000; //proxy도 4000으로 해둠
// db
const mydb = require('./db.js');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

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
let id = 3;
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
];

//로그인 시 GET, POST 요청/응답
app.get('/api/login', (req, res) => {
  res.send(loggedInUser);
});
app.post('/api/login', (req, res) => {
  const { userId, pw } = req.body;
  const user = userInfo.find((user) => user.userId === userId);
  const id = user.id;
  if (user.userId === userId && user.pw !== pw) {
    res.status(400).send('비밀번호가 일치하지 않습니다.');
    return;
  }
  if (user.userId !== userId) {
    res.status(401).send('가입되지 않은 회원입니다.');
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
app.post('/api/signup', async (req, res) => {
  const { userId, pw, nickname, email } = req.body;
  //프론트 화면에 띄우기 위한 확인용(추후 삭제 예정)
  userInfo.push({ id: id++, userId, pw, nickname, email });
  //비밀번호 암호화
  const hashedPW = await bcrypt.hash(pw, 10);
  //db에 추가
  const q =
    'insert into user(inputid, nickname, email, password) VALUES (?,?,?,?);';
  mydb.query(q, [userId, nickname, email, hashedPW], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});
app.post('/api/checkid', (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  //db에서 탐색
  const q = 'SELECT COUNT(*) AS count FROM user WHERE inputid = ?';
  mydb.query(q, [userId], (err, results) => {
    if (err) {
      console.error('error executing query: ', err);
      return res.status(500).json({ error: 'internal server error' });
    }
    const count = results[0].count;
    if (count > 0) {
      return res.status(200).json({ exist: true });
    } else {
      return res.status(200).json({ exist: false });
    }
  });
});

//회원가입 됐는지 확인용 GET요청/응답
app.get('/api/users', (req, res) => {
  res.send(userInfo);
});

//////////////////////////// setting feat ////////////////////////////////
app.get('/user', (req, res) => {
  fs.readFile(userDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(600).json({ error: '오류 발생' });
    }
    res.json(JSON.parse(data));
  });
});

app.put('/user', (req, res) => {
  const { id, nickname, email, currentPassword, newPassword } = req.body;

  console.log('server : ', req.body);

  fs.readFile(userDataPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(601).json({ error: '오류 발생' });
    }

    const userData = JSON.parse(data);

    if (currentPassword !== userData.password) {
      return res.status(602).json({ error: '비밀번호가 올바르지 않습니다.' });
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

app.get('/api/postAll', (req, res) => {
  mydb.query('SELECT * from post', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.get('/api/post', (req, res) => {
  mydb.query('SELECT * from post where anonymity = 0', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.get('/api/mind', (req, res) => {
  mydb.query('SELECT * from post where anonymity = 1', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.get('/api/comment', (req, res) => {
  mydb.query('SELECT * from comment', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.get('/api/postuser', (req, res) => {
  mydb.query('SELECT * from user', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/new', (req, res) => {
  const { id_user, title, body, anonymity } = req.body;
  const q =
    'insert into post(id_user, title, body, anonymity) VALUES (?,?,?,?);';
  mydb.query(q, [id_user, title, body, anonymity], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/comment', (req, res) => {
  const { id_comment, body, id_user, id_post } = req.body;
  const q =
    'insert into comment(id_comment, body, id_user, id_post) VALUES (?,?,?,?);';
  mydb.query(q, [id_comment, body, id_user, id_post], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/edit', (req, res) => {
  const { title, body, id_post } = req.body;
  const q = 'update post set title = ?, body = ? WHERE id_post = ?;';
  mydb.query(q, [title, body, id_post], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/delete', (req, res) => {
  const { id_post, id_comment } = req.body;
  const q = 'delete from comment where id_post = ? && id_comment = ?;';
  mydb.query(q, [id_post, id_comment], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

//////////////////////////// paragraph feat ////////////////////////////////
app.get('/api/paragraph', (req, res) => {
  mydb.query('SELECT * from paragraph', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

//////////////////////////// checklist feat ////////////////////////////////
app.get('/api/askcheck', (req, res) => {
  mydb.query(`SELECT * from askcheck`, (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/updatechecklist', (req, res) => {
  const { id_askcheck, id_user, content, isdone, type } = req.body;
  console.log("updatechecklist",id_askcheck, id_user, content, isdone, type)
  const q = 'update askcheck set id_user = ?, content = ?, isdone = ? WHERE id_askcheck = ? && type = ?;';
  mydb.query(q, [id_user, content, isdone, id_askcheck, type], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

// 회원가입 시 완전한 구현 가능
app.post('/api/createchecklist', (req, res) => {
  const { id_askcheck, id_user, content, isdone, type } = req.body;
  const q =
    'insert into askcheck(id_askcheck, id_user, content, isdone, type) VALUES (?,?,?,?,?);';
  mydb.query(q, [id_askcheck, id_user, content, isdone, type], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

//////////////////////////// diary ////////////////////////////////
app.get('/api/diary', (req, res) => {
  mydb.query('SELECT * from diary', (error, results) => {
    if (error) {
      return res.send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});

app.post('/api/diary', (req, res) => {
  const { id_emotion, id_user, contents } = req.body;
  const q =
    'insert into diary(id_emotion, id_user, contents) VALUES (?,?,?);';
  mydb.query(q, [id_emotion, id_user, contents], (error, results) => {
    if (error) {
      return res.status(500).send('쿼리 실행 실패: ' + error.message);
    }
    res.json(results);
  });
});
//////////////////////////// foot ////////////////////////////////

//http://localhost/:4000 에서 확인
app.get('/', (req, res) => {
  res.json('hello this is the backend');
});

app.listen(4000, () => {
  console.log(`BE Server running`);
});
