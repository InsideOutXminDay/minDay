import '../styles/IntroDiary.css';
export default function IntroDiary() {
  return (
    <article className="intro-diary">
      <div id="diary-part" className="diary-title">
        <h1>하루 한 번, 기록이 주는 변화</h1>
        <span>하루 한 줄 기록으로부터 시작하세요</span>
      </div>
      <div className="diary-content">
        <section>
          <span>즐거웠던 기억도,</span>
          <span>슬펐던 기억도</span>
          <span>모두 챙기지 않으면 안돼요.</span>
          <p>어떤 작은 감정이라도 기록해보세요.</p>
          <p>하루하루가 모이면 내가 누구인지알 수 있을 거예요.</p>
          <p>오늘 어땠는지 표현할 단어가 잘 떠오르지 않는다구요? 걱정마세요.</p>
          <p>minDay는 다양한 감정 이모지를 선택할 수 있습니다!</p>
          <p>
            매일매일 일기 쓰는 습관을 길들이기 어려우시다면 하루 한 줄 일기로
            시작해보세요!
          </p>
        </section>
        <img src="/img/diary.png" alt="diary-image"></img>
      </div>
    </article>
  );
}
