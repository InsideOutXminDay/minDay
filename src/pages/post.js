import React, { useState, useEffect } from 'react';
import '../styles/community/post.css';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FaRegPenToSquare } from 'react-icons/fa6';
import axios from 'axios';
import Header from '../components/Header';

export default function Post(props) {
  const [postdb, setPostdb] = useState([]);
  const [authUser, setAuthUser] = useState('');
  const location = useLocation();
  const { userId } = location.state ? location.state : authUser;
  let myDB = [];

  useEffect(() => {
    const authUser = localStorage.getItem('authUser');
    setAuthUser(authUser);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/post`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        setPostdb([...res.data]);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  const navigate = useNavigate();
  const goTodetail = (item) => {
    navigate(`/detail/${item.id_post}`, {
      state: {
        id_post: item.id_post,
        id_user: userId,
        title: item.title,
        body: item.body,
        lastPage: "/post"
      },
    });
  };

  const goToNew = () => {
    navigate(`/new/${userId}`, {
      state: { userid: userId, lastPage: '/post' },
    });
  };

  for (let i = 0; i < postdb.length; i++) {
    let p = postdb[i];
    if (p.anonymity == 0) {
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
          <h3>일반 커뮤니티</h3>
          <p>서로의 멘탈 관리에 도움이 될 수 있도록 이야기를 공유해 보세요!</p>
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
