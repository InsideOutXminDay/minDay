import '../styles/SignUpForm.css';
export default function SignUpForm() {
  return (
    <div className="signup">
      <img src="/img/logo_full.png"></img>
      <form className="signup-form">
        <div className="id-box">
          <label htmlFor="id">아이디</label>
          <input id="id" type="text" autoFocus required></input>
          <button>중복확인</button>
        </div>
        <div className="nickname-box">
          <label htmlFor="nickname">닉네임</label>
          <input id="nickname" type="text" required></input>
        </div>
        <div className="email-box">
          <label htmlFor="email">이메일</label>
          <input id="email" type="email" required></input>
        </div>
        <div className="pw-box">
          <label htmlFor="pw">비밀번호</label>
          <input id="pw" type="password" required></input>
        </div>
        <div className="pw-sure">
          <label htmlFor="pw-sure">비밀번호 확인</label>
          <input id="pw-sure" type="password" required></input>
        </div>
        <button>회원가입</button>
      </form>
    </div>
  );
}
