import { useNavigate } from 'react-router-dom';
import '../../../styles/HomexDiary/CheckList/CheckList.css';
import CheckItem from './CheckItem';

export default function CheckList({ token, initData, userId }) {
  const navigate = useNavigate();
  const onClickUpdate = () => {
    navigate(`/ask/${userId.id}`);
  };

  return (
    <div className="CheckList">
      <div className="title-wrapper">
        <h4> Checking for Me 🌱</h4>
        <div className="button-section">
          <button onClick={onClickUpdate}>수정하기</button>
        </div>
      </div>
      <div className="list-wrapper-wide">
        {initData.map((item) => (
          <CheckItem token={token} key={item.id_askcheck} {...item} />
        ))}
      </div>
    </div>
  );
}
