import { ImBubble } from 'react-icons/im';
import '../styles/LoginForm.css';
export default function LoginForm() {
  return (
    <article className="login-form">
      <img src="/img/logo_full.png"></img>
      <h1>Log In</h1>
      <form>
        <label htmlFor="id">ID</label>
        <input id="id" type="text"></input>
        <label htmlFor="pw">PW</label>
        <input id="pw" type="password"></input>
      </form>
      <div className="btns">
        <button>Log in</button>
        <button>
          Kakao Login
          <ImBubble />
        </button>
      </div>
      <span>회원 정보를 잊으셨나요?</span>
    </article>
  );
}
