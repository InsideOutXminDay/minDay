//GET, POST 요청, 응답 확인 위한 테스트용 서버입니다.
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//cors
app.use(cors());

// for parsing application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

//로그인 시 GET, POST 요청/응답
app.get('/api/login', (req, res) => {
  res.send(userInfo);
});
app.post('/api/login', (req, res) => {
  const { userId, pw } = req.body;
  const user = userInfo.filter((user) => user.userId === userId);
  if (user.length === 0) {
    res.status(403);
    res.send('가입되지 않은 회원');
    return;
  }
  if (user[0].pw !== pw) {
    res.status(403);
    res.send('비밀번호가 일치하지 않음');
    return;
  }
  res.status(200);
  res.send('로그인 성공');
});

app.listen(4000, () => console.log('4000번 포트에서 서버 실행 중'));
