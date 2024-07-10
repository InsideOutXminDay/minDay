const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const userDataPath = path.join(__dirname, 'userData.json');

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
