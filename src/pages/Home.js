import { useEffect, useState } from 'react';
import CalendarComponent from '../components/HomexDiary/Calendar';
import CheckList from '../components/HomexDiary/CheckList/CheckList';
import Header from '../components/Header';
import axios from 'axios';
import { FindData } from '../util';
import Paragraph from '../components/HomexDiary/Paragraph';

export default function Home({ token }) {
  const [initData, setInitData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/askchecks', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const foundData = FindData(res.data);
        setInitData(foundData);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Header />
      <CalendarComponent token={token} />
      <div style={{ width: '70%', height: '100vh' }}>
        <Paragraph token={token} />
        <CheckList token={token} initData={initData} />
      </div>
    </div>
  );
}
