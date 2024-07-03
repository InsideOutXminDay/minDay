import { FaGithub } from 'react-icons/fa';
export default function IntroFooter() {
  return (
    <footer>
      <img src="/img/logo_full.png" alt="logo-image"></img>
      <section>
        <span>(주) 마인데이 | 사업자등록번호: 123-45-67890</span>
        <span>대표이사: 오혜민 정진규 정혜원 홍미지</span>
        <span>이메일: https://github.com/InsideOutXminDay/minday</span>
        <span>고객센터: 1544-9001</span>
        <span>Copyright &copy INSIDE_OUT co.,Ltd. All rights reserved.</span>
        <FaGithub />
      </section>
    </footer>
  );
}
