import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SettingAccount = ({token, userId}) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axios
      .get('http://localhost:5000/getusername', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        setNickname(res.data.nickname);
        setEmail(res.data.email);
      })
      .catch((error) => console.error('사용자 정보를 가져오는 중 오류 발생:', error));
  }, []);

  const validateNickname = (nickname) => {
    const regex = /^[a-zA-Z0-9가-힣]+$/;
    return regex.test(nickname);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 4;
  };

  const handleSave = async () => {
    const errors = {};
    if (!validateNickname(nickname)) {
      errors.nickname = '올바르지 않은 닉네임 형식입니다.';
    }
    if (!validateEmail(email)) {
      errors.email = '유효한 이메일 형식이 아닙니다.';
    }
    if (!validatePassword(currentPassword)) {
      errors.currentPassword = '비밀번호를 입력해주세요. (4자리 이상)';
    }
    if (!validatePassword(newPassword)) {
      errors.newPassword = '새 비밀번호 / 비밀번호 확인을 입력해주세요. (4자리 이상)';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const requestData = {
          id_user: userId.id,
          nickname,
          email,
          currentPassword,
          newPassword
        };

        console.log('front : ', requestData);
        await axios.post('http://localhost:5000/updateuser', {requestData},
          {
              headers: { authorization: `Bearer ${token}` },
          });
        setNotification('저장되었습니다.');
        setTimeout(() => setNotification(''), 5000);
      } catch (error) {
        console.error(error)
        setNotification('올바른 비밀번호를 입력해주세요.');
        setTimeout(() => setNotification(''), );
      }
    }
  };

  return (
    <div className="setting-account">
      <div className="logo_full_setting">
        <img src='/logo_full.png' alt="로고" />
      </div>
      <h2>회원 정보 변경</h2>
      <div className="form-group">
        <label>아이디</label>
        <input type="text" value={username} disabled />
      </div>
      <div className="form-group">
        <label>닉네임</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
        />
        {errors.nickname && <div className="error">{errors.nickname}</div>}
      </div>
      <div className="form-group">
        <label>이메일</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>
      <div className="form-group">
        <label>비밀번호</label>
        <input
          type="password"
          placeholder="기존 비밀번호를 입력해주세요"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
        {errors.currentPassword && <div className="error">{errors.currentPassword}</div>}
        <input
          type="password"
          placeholder="비밀번호 확인 / 변경할 비밀번호"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        {errors.newPassword && <div className="error">{errors.newPassword}</div>}
      </div>
      <div className="settingButton">
        <button onClick={handleSave}>저장</button>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default SettingAccount;
