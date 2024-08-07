import React, { useState, useEffect } from 'react';
import '../styles/community/post.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaRegPenToSquare } from 'react-icons/fa6';
import axios from 'axios';
import Header from '../components/Header';

export default function Mind(props) {
  const [postdb, setPostdb] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { userId } = location.state;
  let myDB = [];

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/mind`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        setPostdb([...res.data]);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const goTodetail = (item) => {
    navigate(`/detail/${item.id_post}`, {
      state: {
        id_post: item.id_post,
        id_user: userId,
        title: item.title,
        body: item.body,
        lastPage: "/mind"
      },
    });
  };

  const goToNew = () => {
    navigate(`/new/${userId}`, {
      state: { userid: userId, lastPage: '/mind' },
    });
  };

  for (let i = 0; i < postdb.length; i++) {
    let p = postdb[i];
    if (p.anonymity == 1) {
      myDB.push(
        <div className="post-card" key={p.id_post}>
          <NavLink
            to={'/detail/' + p.id_post}
            onClick={(e) => {
              e.preventDefault();
              goTodetail(p);
            }}>
            <h2>{p.title}</h2>
            <p>{p.body}</p>
          </NavLink>
        </div>
      );
    } else { continue; }
  }

  return (
    <>
      <Header userId={userId} logout={props.logout} />
      <div className="post-page">
        {myDB.slice(-1)}
        <div className="guide-card">
          <h3>고민 커뮤니티</h3>
          <p>익명으로 서로의 고민을 나눠보며 숨은 위로와 힐링을 받아보세요!</p>
          <button id="new-post-create">
            <NavLink
              to={'/new/' + userId}
              onClick={(e) => {
                e.preventDefault();
                goToNew();
              }}>
              <FaRegPenToSquare id="post-create-icon">작성</FaRegPenToSquare>
            </NavLink>
          </button>
        </div>
        {myDB.slice(0, myDB.length - 1).reverse()}
      </div>
    </>
  );
}
