import { ImBubble } from 'react-icons/im';
import '../styles/LoginForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function LoginForm() {
  const [user, setUser] = useState([]);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const getData = async () => {
    const response = await axios.get('http://localhost:4000/api/login');
    setUser(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = e.target.id.value;
    const pw = e.target.pw.value;

    console.log(userId, pw);

    await axios.post('http://localhost:4000/api/login', { userId, pw });
    getData();

    setId('');
    setPw('');
  };

  const changeIdHandler = (e) => {
    setId(e.target.value);
  };
  const changePwHandler = (e) => {
    setPw(e.target.value);
  };

  return (
    <>
      <article className="login-form">
        <img src="/img/logo_full.png"></img>
        <h1>Log In</h1>
        <form className="form" onSubmit={submitHandler}>
          <div className="id-input">
            <label htmlFor="id">ID</label>
            <input
              id="id"
              type="text"
              name="id"
              value={id}
              onChange={changeIdHandler}
            ></input>
          </div>
          <div className="pw-input">
            <label htmlFor="pw">PW</label>
            <input
              id="pw"
              type="password"
              name="pw"
              value={pw}
              onChange={changePwHandler}
            ></input>
          </div>
          <button className="login-btn">Log in</button>
        </form>
        <div className="btns">
          <button className="kakao-btn">
            Kakao Login
            <ImBubble color="#3A1D1D" />
          </button>
        </div>
        <span>회원 정보를 잊으셨나요?</span>
      </article>
      <h3>아래는 요청/응답 테스트용입니다.</h3>
      {user.map((user) => (
        <p key={user.id}>
          {user.userId}-{user.pw}
        </p>
      ))}
    </>
  );
}
