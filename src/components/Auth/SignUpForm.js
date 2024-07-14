import { useEffect, useState } from 'react';
import '../../styles/Auth/SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function SignUpForm() {
  const navigate = useNavigate();

  //현재 가입되어 있는 회원 정보(확인용)
  const [userInfo, setUserInfo] = useState([]);

  //회원가입 입력폼 관리
  const [inputForm, setInputForm] = useState({});

  const getData = async () => {
    const response = await axios.get('http://localhost:4000/api/users');
    setUserInfo(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleInputForm = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleCheckDuplicate = (e) => {
    console.log('아이디 중복확인');
    const checkId = userInfo.find((user) => user.userId === inputForm.userId);
    if (checkId) {
      alert('이미 사용중인 아이디입니다.');
      setInputForm({ ...inputForm, userId: '' });
    } else {
      alert('사용 가능한 아이디입니다.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputForm.pw !== inputForm.pwCheck) {
      alert('비밀번호를 다시 확인해주세요');
    }
    //회원가입 정상적으로 되면 현재 가입된 사용자 정보 배열에 추가(확인용)
    setUserInfo([
      ...userInfo,
      {
        userId: inputForm.userId,
        pw: inputForm.pw,
        nickname: inputForm.nickname,
        email: inputForm.email,
      },
    ]);

    //POST 요청 보내기(서버 메모리에 저장)
    await axios.post('http://localhost:4000/api/signup', {
      userId: inputForm.userId,
      pw: inputForm.pw,
      nickname: inputForm.nickname,
      email: inputForm.email,
    });

    setInputForm('');
    //회원가입완료되면 로그인 페이지로
    navigate('/login');
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
              name="userId"
              value={inputForm.userId}
              onChange={handleInputForm}
              autoFocus
              required
            ></input>
            <button className="check-btn" onClick={handleCheckDuplicate}>
              중복확인
            </button>
          </div>
          <div className="nickname-box">
            <label htmlFor="nickname">닉네임</label>
            <input
              id="nickname"
              type="text"
              name="nickname"
              value={inputForm.nickname}
              onChange={handleInputForm}
              required
            ></input>
          </div>
          <div className="email-box">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              name="email"
              value={inputForm.email}
              onChange={handleInputForm}
              required
            ></input>
          </div>
          <div className="pw-box">
            <label htmlFor="pw">비밀번호</label>
            <input
              id="pw"
              type="password"
              value={inputForm.pw}
              name="pw"
              onChange={handleInputForm}
              required
            ></input>
          </div>
          <div className="pw-sure">
            <label htmlFor="pw-sure">비밀번호 확인</label>
            <input
              id="pw-sure"
              type="password"
              name="pwCheck"
              value={inputForm.pwCheck}
              onChange={handleInputForm}
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
