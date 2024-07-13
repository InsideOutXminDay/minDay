import { useEffect, useState } from 'react';
import '../../styles/SignUp/SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function SignUpForm() {
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState([]);

  //아이디, 닉네임, 이메일, 비밀번호 입력 관리
  const [inputId, setInputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [inputPwCheck, setInputPwCheck] = useState('');

  const getData = async () => {
    const response = await axios.get('http://localhost:4000/api/users');
    setUserInfo(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

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
  const handleClick = () => {
    console.log('아이디 중복확인');
    const checkId = userInfo.find((user) => user.userId === inputId);
    if (checkId) {
      alert('이미 사용중인 아이디입니다.');
      setInputId('');
    } else {
      alert('사용 가능한 아이디입니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //비밀번호 확인 일치 안 하면 경고창
    if (inputPw !== inputPwCheck) {
      alert('비밀번호를 다시 확인해주세요');
    }

    //회원가입 이상 없음->userInfo에 추가, post요청 보내기(확인은 /api/user에서 get요청)
    setUserInfo([
      ...userInfo,
      {
        userId: inputId,
        pw: inputPw,
        nickname: inputName,
        email: inputEmail,
      },
    ]);
    //POST 요청 보내기
    await axios.post('http://localhost:4000/api/signup', {
      userId: inputId,
      pw: inputPw,
      nickname: inputName,
      email: inputEmail,
    });

    //입력창 비우기
    setInputId('');
    setInputName('');
    setInputEmail('');
    setInputPw('');
    setInputPwCheck('');
    //회원가입완료되면 로그인 페이지로 or 대문페이지로?
    //navigate('/');
    //navigate('/login');
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
            <button className="check-btn" onClick={handleClick}>
              중복확인
            </button>
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
            아이디: {user.userId} - 닉네임: {user.nickname}
          </p>
        ))}
      </div>
    </>
  );
}
