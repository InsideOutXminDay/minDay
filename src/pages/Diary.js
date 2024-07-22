import { useParams } from 'react-router-dom';
import DiaryEditor from '../components/HomexDiary/DiaryEditor';
import Header from '../components/Header';
import { useState, useEffect } from 'react';
import { FindData } from '../util';
import axios from 'axios';

export default function Diary(token, data) {
  const [predata, setPreData] = useState([]);
  const diaryId = useParams();
  const [diaryData, setDiaryData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/diarys', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const foundData = FindData(res.data);
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
      const res = await axios.post(`http://localhost:5000/updatediary`, {
        data,
      });
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <DiaryEditor initData={predata} onSubmit={onSubmit} />
    </div>
  );
}
