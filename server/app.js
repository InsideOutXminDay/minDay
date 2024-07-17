//GET, POST 요청, 응답 확인 위한 테스트용 서버입니다.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();

//cors
app.use(cors());

// for parsing application/json
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

//샘플 데이터 입니다. (간이 db)
let id = 6;
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

const loggedInUser = [];

app.get('/', (req, res) => res.send('signup/login server home'));

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

//로그아웃
// app.get('/api/logout', (req, res) => {
//   req.session.destroy();
//   res.send('로그아웃 성공');
// });

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

app.listen(`${process.env.REACT_APP_BE_PORT}`, () => console.log(`${process.env.REACT_APP_BE_PORT}번 포트에서 서버 실행 중`));
