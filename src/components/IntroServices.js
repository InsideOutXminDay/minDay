import { SlNotebook } from 'react-icons/sl';
import { FaCheck } from 'react-icons/fa6';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineOndemandVideo } from 'react-icons/md';
export default function IntroServices() {
  return (
    <article>
      <h1>당신의 minDay</h1>
      <section className="diary">
        <div>
          <SlNotebook />
        </div>
        <h2>감정일기</h2>
        <span>
          오늘 하루 나의 감정 상태를 생각해보고 이모지로 표현해 보세요.
        </span>
        <span>그리고 1줄 일기로 감정을 정리해보세요.</span>
      </section>
      <section className="checklist">
        <div>
          <FaCheck />
        </div>
        <h2>데일리 체크리스트</h2>
        <span>
          간단한 설문을 통해 오늘 하루를 어떻게 보내면 좋을지 알려드려요!
        </span>
        <span>체크할 때마다 뿌듯함까지 2배!</span>
      </section>
      <section className="community">
        <div>
          <FaPeopleGroup />
        </div>
        <h2>커뮤니티</h2>
        <span>일상 게시판에서 서로의 힐링 방법을 공유해보아요!</span>
        <span>고민 게시판은 익명으로 운영되니 솔직하게 털어놓아보세요!</span>
      </section>
      <section className="contents">
        <div>
          <MdOutlineOndemandVideo />
        </div>
        <h2>다양한 컨텐츠</h2>
        <span>마음이 복잡할 때, 휴식이 필요할 때, 활력을 느끼고 싶을 때</span>
        <span>보고 싶은 컨텐츠를 다양하게 즐겨보세요!</span>
      </section>
    </article>
  );
}
