import { ImBubble } from 'react-icons/im';
import '../../styles/Auth/LoginForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm({ setToken }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    console.log('로그인 요청 보냄', username, password);

    try {
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });
      setToken(response.data.token);
      console.log('Login successful');
      navigate('/home');
      // if (response.status === 200) {
      //   navigate('/home');
      // }
    } catch (error) {
      // if (error.response && error.response.status === 400) {
      //   alert('비밀번호를 다시 확인해주세요.');
      // } else {
      //   alert('가입되지 않은 회원입니다.');
      // }
    }

    setUsername('');
    setPassword('');
  };

  // const handleLogOut = async () => {
  //   await axios.get(`${process.env.REACT_APP_API_URL}/logout`);
  //   //navigate('/');
  // };

  const changeIdHandler = (e) => {
    setUsername(e.target.value);
  };
  const changePwHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <>
      <article className="login-form">
        <img src="/img/logo_full.png"></img>

        <div>
          <h1>Log In</h1>
          <form className="form" onSubmit={submitHandler}>
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

        <div className="btns">
          <button className="kakao-btn">
            Kakao Login
            <ImBubble color="#3A1D1D" />
          </button>
        </div>
        <span>회원 정보를 잊으셨나요?</span>
      </article>
    </>
  );
}
