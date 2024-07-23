import { useLocation, useParams } from 'react-router-dom';
import DiaryEditor from '../components/HomexDiary/DiaryEditor';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { FindData } from '../util';
import axios from 'axios';

export default function Diary({token}) {
  const [predata, setPreData] = useState([]);
  const diaryId = useParams();
  const [diaryData, setDiaryData] = useState([]);
  const location = useLocation();
  const { userId } = location.state || {}; 


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
  // diary 데이터관련
  useEffect(() => {
    const foundData = diaryData.find(
      (value) => String(value.id_diary) === String(diaryId.id)
    );
    if (foundData) {
      setPreData(foundData);
    }
  }, [diaryData]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/updatediary`, 
        {data},
        {
          headers: { authorization: `Bearer ${token}` },
        });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <DiaryEditor initData={predata} onSubmit={onSubmit} userId={userId} />
    </div>
  );
}
