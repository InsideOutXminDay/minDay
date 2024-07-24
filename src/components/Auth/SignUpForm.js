import { useState } from 'react';
import '../../styles/Auth/SignUpForm.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Modal from '../Auth/Modal';
export default function SignUpForm() {
  const navigate = useNavigate();

  //회원가입 입력폼 관리
  const [inputForm, setInputForm] = useState({});
  const [submit, setSubmit] = useState(false);
  //모달 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleInputForm = (e) => {
    setInputForm({ ...inputForm, [e.target.name]: e.target.value });
  };

  const handleCheckDuplicate = async (e) => {
    const { username } = inputForm;
    const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/join/check`, {
      username,
    });
    if (response.data.exist === true) {
      setModalContent('이미 사용중인 아이디입니다.');
      setInputForm({ ...inputForm, username: '' });
    } else {
      setModalContent('사용 가능한 아이디입니다.');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputForm.password !== inputForm.passwordCheck) {
      setModalContent('비밀번호를 다시 확인해주세요.');
      setIsModalOpen(true);
      setInputForm({ ...inputForm, password: '', passwordCheck: '' });
    } else {
      setSubmit(true);
      setInputForm('');
      console.log('inputForm:', inputForm);
      await axios.post(`${process.env.REACT_APP_API_URL}/api/join`, {
        username: inputForm.username,
        password: inputForm.password,
        nickname: inputForm.nickname,
        email: inputForm.email,
      });
    }
  };

  const gotoLogin = () => {
    navigate('/login');
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
            <button className="signup-ok-btn" onClick={gotoLogin}>
              로그인 하러 가기
            </button>
          </div>
        ) : (
          <form className="signup-form" onSubmit={handleSubmit}>
            <div className="id-box">
              <label htmlFor="id">아이디</label>
              <input
                id="id"
                type="text"
                name="username"
                value={inputForm.username || ''}
                onChange={handleInputForm}
                autoFocus
                required
              ></input>
              <button className="check-btn" onClick={handleCheckDuplicate}>
                중복확인
              </button>
              <Modal
                isOpen={isModalOpen}
                content={modalContent}
                onClose={handleCloseModal}
              ></Modal>
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
                value={inputForm.password || ''}
                name="password"
                onChange={handleInputForm}
                required
              ></input>
            </div>
            <div className="pw-sure">
              <label htmlFor="pw-sure">비밀번호 확인</label>
              <input
                id="pw-sure"
                type="password"
                name="passwordCheck"
                value={inputForm.passwordCheck || ''}
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
