import '../../styles/HomexDiary/Calendar.css';
import { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import moment from 'moment';
import { IoPencilOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { FindData } from '../../util';
import axios from 'axios';

export default function CalendarComponent({ token,userId }) {
  const [date, setDate] = useState(new Date());
  const [diaryData, setDiaryData] = useState([]);
  const [nowDiary, setNowDiary] = useState(null);
  const [Isview, setView] = useState(true);
  const navigate = useNavigate();
  // 데이터 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/diarys`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const foundData = FindData(res.data,userId.id);
        setDiaryData(foundData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // 오늘 날짜 일기 바로 보여줌
  useEffect(() => {
    const dateStr = moment(date).format('YYYY-MM-DD');
    const matching = diaryData.find((value) => value.Diary.date === dateStr);
    setNowDiary(matching);
  }, [diaryData]);

  //달력 날짜 타일 누르면 변화 일어나는 함수
  const onChange = (day) => {
    setView(true);
    setDate(day);
    const dateStr = moment(day).format('YYYY-MM-DD');
    const matching = diaryData.find((value) => value.Diary.date === dateStr);
    if (matching) {
      setNowDiary(matching);
    } else {
      setNowDiary(null);
    }
  };

  // 타일에 나타낼 요소 정하는 함수
  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateStr = moment(date).format('YYYY-MM-DD');
      const matching = diaryData.find((value) => value.Diary.date === dateStr);
      if (matching) {
        return (
          <div>
            <img
              style={{ width: '30px' }}
              src={`/img/emotions/emotion${matching.Diary.id_emotion}.png`}
            />
          </div>
        );
      }
    }
    return null;
  };

  // 수정 버튼 클릭으로 일기 수정
  const onClickUpdate = () => {
    const moveTo = nowDiary ? `/diary/${nowDiary.id_diary}` : '/newdiary';
    navigate(moveTo, { state: { date: date, userId:userId } });
  };
  return (
    <div className="container">
      <div className="Calendar">
        <Calendar
          locale="en"
          onChange={onChange}
          value={date}
          next2Label={null}
          prev2Label={null}
          formatDay={(locale, date) => moment(date).format('D')}
          tileContent={tileContent}
          showNeighboringMonth={false}
          onViewChange={({ view }) =>
            view === 'month' ? setView(true) : setView(false)
          }
        />
      </div>

      {Isview && (
        <>
          {nowDiary ? (
            <>
              <div className="emotion-section">
                <img
                  style={{ width: '60px' }}
                  src={`/img/emotions/emotion${nowDiary.Diary.id_emotion}.png`}
                  alt="Emotion"
                />
              </div>
              <div className="diary-section">
                <p>{nowDiary.Diary.content.slice(0, 20)}</p>
              </div>
            </>
          ) : null}
          <div className="edit-section">
            <button onClick={onClickUpdate}>
              <IoPencilOutline size={35} color="#fffafd" />
            </button>
          </div>
        </>
      )}
    </div>
  );
}
