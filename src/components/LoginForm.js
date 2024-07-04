import { ImBubble } from 'react-icons/im';
import '../styles/LoginForm.css';
export default function LoginForm() {
  return (
    <article className="login-form">
      <img src="/img/logo_full.png"></img>
      <h1>Log In</h1>
      <form className="form">
        <div className="id-input">
          <label htmlFor="id">ID</label>
          <input id="id" type="text"></input>
        </div>
        <div className="pw-input">
          <label htmlFor="pw">PW</label>
          <input id="pw" type="password"></input>
        </div>
      </form>
      <div className="btns">
        <button className="login-btn">Log in</button>
        <button className="kakao-btn">
          Kakao Login
          <ImBubble color="#3A1D1D" />
        </button>
      </div>
      <span>회원 정보를 잊으셨나요?</span>
    </article>
  );
}
