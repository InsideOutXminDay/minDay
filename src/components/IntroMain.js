import '../styles/IntroMain.css';
export default function IntroMain() {
  return (
    <article className="intro-main">
      <img src="/img/mirror.png" alt="mirror-image"></img>
      <div className="intro-text">
        <span>minDay와 함께 '나'를 챙기는 시간!</span>
        <span>지금 바로 어떠신가요?</span>
        <button>시작하기</button>
      </div>
    </article>
  );
}
