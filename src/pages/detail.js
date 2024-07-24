import React, { useState, useEffect } from 'react';
import '../styles/community/detail.css';
import { NavLink, useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoCaretBackOutline } from 'react-icons/io5';
import { LuDelete } from 'react-icons/lu';
import axios from 'axios';
import Header from '../components/Header';

export default function Detail(props) {
  let myComment = [];
  const navigate = useNavigate();
  const location = useLocation();
  const postInfo = { ...location.state };
  let backButton = postInfo.anonymity ? '/mind' : '/post';
  let userNickname = '';

  const [commentDB, setCommentDB] = useState([]);
  const [userDB, setUserDB] = useState([]);
  const [postDB, setPostDB] = useState([]);
  const params = useParams();
  let nowPost = {};
  const [userID, setUserID] = useState('');
  const [userNick, setUserNick] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/postAll`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        setPostDB([...res.data]);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/comment`, {
        headers: {
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        setCommentDB([...res.data]);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/postuser`, {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${props.token}`,
        },
      })
      .then((res) => {
        setUserDB([...res.data]);
        setUserNick(res.data[0].nickname);
        setUserID(res.data[0].id_user);
      })
      .catch((error) => console.error('Error:', error));
  }, []);

  for (let i = 0; i < commentDB.length; i++) {
    if (Number(params.id) === commentDB[i].id_post) {
      let commentX = null;
      if (commentDB[i].id_user === Number(userID)) {
        commentX = (
          <button
            onClick={(e) => {
              e.preventDefault();
              let item = {
                id_post: Number(params.id),
                id_comment: commentDB[i].id_comment,
              };
              deleteComment(item);
            }}
          >
            <LuDelete height="20px" />
          </button>
        );
      }
      myComment.push(
        <>
          <p>{commentDB[i].body}</p>
          {commentX}
        </>
      );
    }
  }

  for (let t = 0; t < postDB.length; t++) {
    if (Number(params.id) === postDB[t].id_post) {
      nowPost = {
        detail_post: postDB[t].id_post,
        detail_user: postDB[t].id_user,
        detail_title: postDB[t].title,
        detail_body: postDB[t].body,
        detail_anonymity: postDB[t].anonymity,
      };
    }
  }

  for (let t = 0; t < userDB.length; t++) {
    if (Number(userID) === userDB[t].id_user) {
      userNickname = userDB[t].nickname;
    }
  }

  const goToEdit = (item) => {
    navigate(`/edit/${item.detail_post}`, {
      state: {
        id_post: item.detail_post,
        id_user: item.detail_user,
        title: item.detail_title,
        body: item.detail_body,
        anonymity: item.detail_anonymity,
      },
    });
  };

  const newSaveComment = (item) => {
    let body = item.body;

    let _item = {
      body: item.body,
      id_user: userID,
      id_post: nowPost.detail_post,
    };
    if (body == '') {
      alert('입력 내용을 확인하세요');
    } else {
      newSaveCommentFunc(_item);
    }
  };

  const newSaveCommentFunc = (item) => {
    let body = item.body;
    let id_user = userID;
    let id_post = nowPost.detail_post;
    fetch(`${process.env.REACT_APP_API_URL}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        body: body,
        id_user: id_user,
        id_post: id_post,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error('Error:', error.message))
      .then(alert('저장되었습니다'));
    window.location.replace(`/detail/${nowPost.detail_post}`);
  };

  const deleteComment = (item) => {
    let id_post = item.id_post;
    let id_comment = item.id_comment;
    fetch(`${process.env.REACT_APP_API_URL}/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${props.token}`,
      },
      body: JSON.stringify({
        id_post: id_post,
        id_comment: id_comment,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((error) => console.error('Error:', error.message))
      .then(alert('삭제되었습니다'));
    // navigate(`/detail/${nowPost.detail_post}`);
    window.location.replace(`/detail/${nowPost.detail_post}`);
  };

  return (
    <>
      <Header logout={props.logout} />
      <div className="detail-page">
        <div className="detail-bar">
          <NavLink to={backButton}>
            <IoCaretBackOutline id="post-back"></IoCaretBackOutline>
          </NavLink>
          <div className="button-right">
            <span>
              <input
                type="submit"
                value={userNick}
                id="detail-submit"
                onClick={(e) => {
                  e.preventDefault();
                  if (nowPost.detail_user === Number(userID)) {
                    goToEdit(nowPost);
                  }
                }}
              />
            </span>
          </div>
        </div>
        <div className="detail-title-bar">
          <p>{nowPost.detail_title}</p>
        </div>
        <div className="detail-textarea">
          <p>{nowPost.detail_body}</p>
        </div>
        <div>
          <div className="detail-comment-input">
            <div>
              <form
                className="detail-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  let item = {
                    id_post: nowPost.detail_post,
                    id_user: userID,
                    body: e.target.body.value,
                  };
                  newSaveComment(item);
                }}
              >
                <p className="input-text">
                  <input placeholder="댓글을 입력해주세요" name="body" />
                </p>
                <p className="button-right">
                  <input
                    id="detail-comment-submit"
                    type="submit"
                    value="댓글쓰기"
                  />
                </p>
              </form>
            </div>
          </div>
        </div>
        {[...myComment].reverse().map((item) => (
          <div className="detail-comment-bar">{item}</div>
        ))}
      </div>
    </>
  );
}
