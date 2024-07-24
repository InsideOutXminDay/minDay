import { ImBubble } from 'react-icons/im';
import '../../styles/Auth/LoginForm.css';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Modal from '../Auth/Modal';

export default function LoginForm({ setToken, onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log('로그인 요청 보냄', username, password);

    const response = await axios.post(
      `${process.env.REACT_APP_API_URL}/api/login`,
      {
        username,
        password,
      }
    );
    if (response.data.success === false) {
      setModalContent(response.data.message);
      setIsModalOpen(true);
      setUsername('');
      setPassword('');
    } else {
      setToken(response.data.token);
      onLogin(response.data.id_user);
      navigate(`/home/${response.data.id_user}`);
    }
  };

  const changeIdHandler = (e) => {
    setUsername(e.target.value);
  };
  const changePwHandler = (e) => {
    setPassword(e.target.value);
  };
  const handleCloseModal = (e) => {
    setIsModalOpen(false);
  };

  return (
    <>
      <article className="login-form">
        <img src="/img/logo_full.png"></img>
        <Modal
          isOpen={isModalOpen}
          content={modalContent}
          onClose={handleCloseModal}
        ></Modal>
        <div className="login-input">
          <h1>Log In</h1>
          <form className="input-form" onSubmit={submitHandler}>
            <div className="id-input">
              <label htmlFor="id">ID</label>
              <input
                id="id"
                type="text"
                name="username"
                value={username}
                onChange={changeIdHandler}
              ></input>
            </div>
            <div className="pw-input">
              <label htmlFor="pw">PW</label>
              <input
                id="pw"
                type="password"
                name="password"
                value={password}
                onChange={changePwHandler}
              ></input>
            </div>
            <button className="login-btn">Log in</button>
          </form>
        </div>

        <div className="login-other">
          <button className="kakao-btn">
            <span>Kakao Login</span>
            <ImBubble color="#3A1D1D" />
          </button>
          <span className="find-text">회원 정보를 잊으셨나요?</span>
        </div>
      </article>
    </>
  );
}
