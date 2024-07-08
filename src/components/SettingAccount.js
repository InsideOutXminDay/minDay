import React, { useState, useEffect } from 'react';

const SettingAccount = () => {
  const [nickname, setNickname] = useState('오렌지');
  const [email, setEmail] = useState('coco@naver.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [notification, setNotification] = useState('');
  const [errors, setErrors] = useState({});

  const validateNickname = (nickname) => {
    const regex = /^[a-zA-Z0-9가-힣]+$/;
    return regex.test(nickname);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSave = () => {
    const errors = {};
    if (!validateNickname(nickname)) {
      errors.nickname = '올바르지 않은 닉네임 형식입니다.';
    }
    if (!validateEmail(email)) {
      errors.email = '유효한 이메일 형식이 아닙니다.';
    }
    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      // 테스트 콘솔 로그
      console.log({
        nickname,
        email,
        currentPassword,
        newPassword
      });
      setNotification('저장되었습니다.');
      setTimeout(() => setNotification(''), 2000);
    }
  };

  return (
    <div className="setting-account">
      <div className="logo_full_setting">
        <img src='/logo_full.png' />
      </div>
      <h2>회원 정보 변경</h2>
      <div className="form-group">
        <label>아이디</label>
        <input type="text" value="coco123" disabled />
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
        <input
          type="password"
          placeholder="새 비밀번호를 입력해주세요"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="settingButton">
        <button onClick={handleSave}>저장</button>
        {notification && <div className="notification">{notification}</div>}
      </div>
    </div>
  );
};

export default SettingAccount;
