import { ImBubble } from 'react-icons/im';
import '../../styles/Auth/LoginForm.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginForm() {
  //아이디, 비밀번호 관리(식별 id는 서버에서)
  const [user, setUser] = useState([]);
  //로그인 정보 관리
  const [login, setLogin] = useState([]);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const navigate = useNavigate();

  const getData = async () => {
    const response = await axios.get('http://localhost:4000/api/users');
    setUser(response.data);

    const loggedInUser = await axios.get('http://localhost:4000/api/login');
    setLogin(loggedInUser.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    const userId = e.target.id.value;
    const pw = e.target.pw.value;

    console.log(userId, pw);

    try {
      const response = await axios.post('http://localhost:4000/api/login', {
        userId,
        pw,
      });
      getData();
      if (response.status === 200) {
        navigate('/home');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert('비밀번호를 다시 확인해주세요.');
      } else {
        alert('가입되지 않은 회원입니다.');
      }
    }

    setId('');
    setPw('');
  };

  // const handleLogOut = async () => {
  //   await axios.get('http://localhost:4000/api/logout');
  //   //navigate('/');
  // };

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
        {login.length >= 1 ? (
          <button>로그아웃</button>
        ) : (
          <div>
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
          </div>
        )}

        <div className="btns">
          <button className="kakao-btn">
            Kakao Login
            <ImBubble color="#3A1D1D" />
          </button>
        </div>
        <span>회원 정보를 잊으셨나요?</span>
      </article>
      <div className="login-test">
        <h3>userInfo의 간이 데이터입니다.</h3>
        <p>아이디-비밀번호입니다. 맞게 입력하면 홈페이지로이동합니다.</p>
        <p>
          비밀번호를 틀리거나, 아예 다른 아이디를 입력하면 400에러가 뜹니다.
        </p>
        {user.map((user) => (
          <p key={user.id}>
            {user.userId}-{user.pw}
          </p>
        ))}
        <p>로그인한 사용자</p>
        {login.map((user) => (
          <p key={user.id}>{user.userId}</p>
        ))}
      </div>
    </>
  );
}
