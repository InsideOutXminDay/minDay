import { SlNotebook } from 'react-icons/sl';
import { FaCheck } from 'react-icons/fa6';
import { FaPeopleGroup } from 'react-icons/fa6';
import { MdOutlineOndemandVideo } from 'react-icons/md';
import '../styles/IntroServices.css';
export default function IntroServices() {
  return (
    <article className="intro-services">
      <h1>당신의 minDay</h1>
      <div className="services">
        <section className="diary">
          <a class="service-link" href="#diary-part">
            <div className="circle">
              <SlNotebook size="120" />
            </div>
          </a>
          <h2>감정일기</h2>
          <p>오늘 하루 나의 감정 상태를 생각해보고 이모지로 표현해 보세요.</p>
          <p>그리고 1줄 일기로 감정을 정리해보세요.</p>
        </section>
        <section className="checklist">
          <a class="service-link" href="#check-part">
            <div className="circle">
              <FaCheck size="120" />
            </div>
          </a>
          <h2>데일리 체크리스트</h2>
          <p>간단한 설문으로 오늘 하루를 어떻게 보내면 좋을지 알려드려요!</p>
          <p>체크할 때마다 뿌듯함까지 2배!</p>
        </section>
        <section className="community">
          <a class="service-link" href="#commu-part">
            <div className="circle">
              <FaPeopleGroup size="120" />
            </div>
          </a>
          <h2>커뮤니티</h2>
          <p>일상 게시판에서 서로의 힐링 방법을 공유해보아요!</p>
          <p>고민 게시판은 익명으로 운영되니 솔직하게 털어놓아보세요!</p>
        </section>
        <section className="contents-box">
          <a class="service-link" href="#contents-part">
            <div className="circle">
              <MdOutlineOndemandVideo size="120" />
            </div>
          </a>
          <h2>다양한 컨텐츠</h2>
          <p>마음이 복잡할 때, 휴식이 필요할 때, 활력을 느끼고 싶을 때</p>
          <p>보고 싶은 컨텐츠를 다양하게 즐겨보세요!</p>
        </section>
      </div>
    </article>
  );
}
