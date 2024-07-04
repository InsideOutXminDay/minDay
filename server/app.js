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

//샘플 데이터 입니다.
let id = 2;
const userInfo = [{ id: 1, userId: 'abc3085', pw: '1234' }];

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });
app.get('/api/login', (req, res) => {
  res.send(userInfo);
});

app.post('/api/login', (req, res) => {
  const { userId, pw } = req.body;
  userInfo.push({ id: id++, userId, pw });
  return res.send('성공');
});

app.listen(4000, () => console.log('4000번 포트에서 서버 실행 중'));
