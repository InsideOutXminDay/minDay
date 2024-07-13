import '../../styles/Intros/IntroContents.css';
export default function IntroContents() {
  return (
    <article className="intro-contents">
      <div id="contents-part" className="contents-title">
        <h1>지금 나에게 필요한 컨텐츠</h1>
        <span>필요할 때마다 인터넷 검색을 할 필요가 없어요.</span>
        <span>minDay에서 바로 즐기세요!</span>
      </div>
      <div className="contents-content">
        <img src="/img/contents.png" alt="contents-image"></img>
        <section>
          <span>마음에게도 기분전환을 시켜주는</span>
          <span>다양한 컨텐츠</span>
          <p>편한 숙면을, 복잡한 마음을 진정시켜줄 다양한 컨텐츠!</p>
          <p>
            minDay의 회원들이 직접 체험하고 남긴 후기를 보고 한번 결정해보세요!
          </p>
        </section>
      </div>
    </article>
  );
}
