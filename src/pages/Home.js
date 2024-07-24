import { useEffect, useState } from 'react';
import CalendarComponent from '../components/HomexDiary/Calendar';
import CheckList from '../components/HomexDiary/CheckList/CheckList';
import Header from '../components/Header';
import axios from 'axios';
import { FindData } from '../util';
import Paragraph from '../components/HomexDiary/Paragraph';
import { useParams } from 'react-router-dom';

export default function Home({ token, logout }) {
  const [initData, setInitData] = useState([]);
  const userId = useParams();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/askchecks`, {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const foundData = FindData(res.data, userId.id);
        setInitData(foundData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Header userId={userId} logout={logout} />
      <CalendarComponent token={token} userId={userId} />
      <div style={{ width: '70%', height: '100vh' }}>
        <Paragraph token={token} />
        <CheckList token={token} initData={initData} userId={userId} />
      </div>
    </div>
  );
}
