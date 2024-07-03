import '../styles/IntroCommunity.css';
export default function IntroCommunity() {
  return (
    <article className="intro-community">
      <div className="community-title">
        <h1>함께 나눈다는 것</h1>
        <span>함께 나눌수록 더 좋아요</span>
      </div>
      <div className="community-content">
        <section>
          <span>행복은 나누면 2배</span>
          <span>슬픔은 나누면 1/2배</span>
          <p>일반 게시판에서는 일상에서 좋았던 경험을 공유해보세요.</p>
          <p>
            내가 재밌게 읽은 책이 누군가에도 인생 책이 될 수도! 나만의 힐링
            스팟을 공유하는 것도 좋네요!
          </p>
          <p>고민 게시판에서는 쉽게 털어내지 못한 얘기를 꺼내보세요.</p>
          <p>
            나뿐만 아니라 다른 누구도 같은 고민을 가지고 있을 거예요. 혼자라고
            생각하지 마세요.
          </p>
        </section>
        <img src="/img/chat.png" alt="community-image"></img>
      </div>
    </article>
  );
}
