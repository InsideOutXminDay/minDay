import { useLocation, useParams } from 'react-router-dom';
import DiaryEditor from '../components/HomexDiary/DiaryEditor';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { FindData } from '../util';
import axios from 'axios';

export default function Diary({ token, logout }) {
  const [predata, setPreData] = useState([]);
  const diaryId = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const [emotionData, setEmotionData] = useState([]);
  const location = useLocation();
  const { userId } = location.state || {}; 

  // diary 데이터불러오기 및 사용자 선택 다이어리 정제
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/diarys`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const foundData = FindData(res.data, userId.id);
        setDiaryData(foundData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const foundData = diaryData.find(
      (value) => String(value.id_diary) === String(diaryId.id)
    );
    if (foundData) {
      setPreData(foundData);
    }
  }, [diaryData]);

  // emotion list 불러오기
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/emotionicons`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setEmotionData(res.data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  // 기존 diary 업데이트
  const onSubmit = async (data) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/updatediary`,
        { data },
        {
          headers: { authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <Header userId={userId} logout={logout}/>
      <DiaryEditor initData={predata} onSubmit={onSubmit} userId={userId} emotionData={emotionData} />

    </div>
  );
}
