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
  //add : 변수를 하나로 쓰기위해서 초기값을 useParams로 저장
  const [userID, setUserID] = useState(userId.id);
console.log(userID)
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

  // add : useParams로 데이터가 넘어오지 않을때 user id 가져오기
  // home 에서 logo 눌러도 url 에러 없음
  useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_API_URL}/postuser`, {
            headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`,
            },
        })
        .then((res) => {
            setUserID(res.data[0].id_user);
        })
        .catch((error) => console.error('Error:', error));
}, []);

  return (
    <div style={{ display: 'flex' }}>
      <Header userId={userID} logout={logout} />
      <CalendarComponent token={token} userId={userId} />
      <div style={{ width: '70%', height: '100vh' }}>
        <Paragraph token={token} />
        <CheckList token={token} initData={initData} userId={userId} />
      </div>
    </div>
  );
}
