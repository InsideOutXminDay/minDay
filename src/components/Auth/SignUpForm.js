import { useEffect, useState } from 'react';
import '../../styles/Auth/SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function SignUpForm() {
  const navigate = useNavigate();

  //회원가입 입력폼 관리
  const [inputForm, setInputForm] = useState({});
  const [submit, setSubmit] = useState(false);

  const handleInputForm = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleCheckDuplicate = async (e) => {
    const { userId } = inputForm;
    const response = await axios.post('http://localhost:4000/api/checkid', {
      userId,
    });
    if (response.data.exist === true) {
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
      setInputForm({ ...inputForm, pw: '', pwCheck: '' });
    } else {
      setSubmit(true);
      setInputForm('');
      await axios.post('http://localhost:4000/api/signup', {
        userId: inputForm.userId,
        pw: inputForm.pw,
        nickname: inputForm.nickname,
        email: inputForm.email,
      });
    }
  };

  return (
    <>
      <div className="signup">
        <img src="/img/logo_full.png"></img>
        {submit ? (
          <div className="signup-ok">
            <span className="signup-ok-text">회원가입이 완료되었습니다.</span>
            <span className="signup-ok-text">
              바로 로그인해서 minDay를 만들어보세요!
            </span>
            <button className="signup-ok-btn">로그인 하러 가기</button>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="id-box">
              <label htmlFor="id">아이디</label>
              <input
                id="id"
                type="text"
                name="userId"
                value={inputForm.userId || ''}
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
                value={inputForm.nickname || ''}
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
                value={inputForm.email || ''}
                onChange={handleInputForm}
                required
              ></input>
            </div>
            <div className="pw-box">
              <label htmlFor="pw">비밀번호</label>
              <input
                id="pw"
                type="password"
                value={inputForm.pw || ''}
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
                value={inputForm.pwCheck || ''}
                onChange={handleInputForm}
                required
              ></input>
            </div>
            <button className="signup-btn">회원가입</button>
          </form>
        )}
      </div>
    </>
  );
}
