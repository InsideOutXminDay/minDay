import '../styles/IntroCheckList.css';
export default function IntroCheckList() {
  return (
    <article className="intro-checklist">
      <div id="check-part" className="checklist-title">
        <h1>작지만 아주 기본인 것</h1>
        <span>건강한 멘탈은 곧 건강한 신체!</span>
        <span>작은 것부터 실천해가며 루틴화 시켜보세요.</span>
      </div>

      <div className="check-content">
        <img src="/img/checklist.png" alt="checklist-image"></img>
        <section>
          <span>매일 자신의 상태를 체크해 보세요.</span>
          <p>
            적당한 수면 시간, 적당한 활동량, 균형잡힌 식사를 정해진 시간에 먹는
            것, 나의 스트레스를 날려버릴 활동!
          </p>
          <p>
            마음이 지치면 이런 사소한 것도 챙기기 어려워요. minDay가 매일
            데일리체크를 통해 현재 상태를 알려드려요!
          </p>
          <p>체크리스트를 하나씩 달성해가며 나를 챙겨보는 게 어떤가요?</p>
        </section>
      </div>
    </article>
  );
}
