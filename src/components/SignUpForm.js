import { useEffect, useState } from 'react';
import '../styles/SignUpForm.css';
import { useNavigate } from 'react-router-dom';
export default function SignUpForm() {
  const navigate = useNavigate();

  //회원가입 정보 관리
  const [userInfo, setUserInfo] = useState([
    { id: 'happy', name: 'hw', pw: 1234, email: 'good@naver.com' },
    { id: 'sad', name: 'wh', pw: 1111, email: 'bad@naver.com' },
  ]);
  //아이디, 닉네임, 이메일, 비밀번호 입력 관리
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputPwCheck, setInputPwCheck] = useState('');

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };
  const handleInputName = (e) => {
    setInputName(e.target.value);
  };
  const handleInputEmail = (e) => {
    setInputEmail(e.target.value);
  };
  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  const handleInputPwCheck = (e) => {
    setInputPwCheck(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //비밀번호 확인 일치 안 하면 경고창
    if (inputPw !== inputPwCheck) {
      alert('비밀번호를 다시 확인해주세요');
    }
    setUserInfo([
      ...userInfo,
      {
        id: inputId,
        pw: inputPw,
        name: inputName,
        email: inputEmail,
      },
    ]);
    //POST 요청 보내기

    //입력창 비우기
    setInputId('');
    setInputName('');
    setInputEmail('');
    setInputPw('');
    setInputPwCheck('');
    //회원가입완료되면 로그인된 채로 홈페이지로
    //navigate('/home');
  };

  return (
    <>
      <div className="signup">
        <img src="/img/logo_full.png"></img>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="id-box">
            <label htmlFor="id">아이디</label>
            <input
              id="id"
              type="text"
              value={inputId}
              onChange={handleInputId}
              autoFocus
              required
            ></input>
            <button className="check-btn">중복확인</button>
          </div>
          <div className="nickname-box">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              value={inputName}
              onChange={handleInputName}
              required
            ></input>
          </div>
          <div className="email-box">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              value={inputEmail}
              onChange={handleInputEmail}
              required
            ></input>
          </div>
          <div className="pw-box">
            <label htmlFor="pw">비밀번호</label>
            <input
              id="pw"
              type="password"
              value={inputPw}
              onChange={handleInputPw}
              required
            ></input>
          </div>
          <div className="pw-sure">
            <label htmlFor="pw-sure">비밀번호 확인</label>
            <input
              id="pw-sure"
              type="password"
              value={inputPwCheck}
              onChange={handleInputPwCheck}
              required
            ></input>
          </div>
          <button className="signup-btn">회원가입</button>
        </form>
      </div>
      <div className="signup-test">
        {userInfo.map((user, index) => (
          <p key={index}>
            아이디: {user.id} - 닉네임: {user.name}
          </p>
        ))}
      </div>
    </>
  );
}
