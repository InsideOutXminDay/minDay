import React, { useState, useEffect } from "react";
import '../styles/detail.css';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import axios from 'axios';


export default function Detail() {

    let myComment = [];
    const navigate = useNavigate();
    const location = useLocation();
    const postInfo = { ...location.state };
    let backButton = postInfo.anonymity ? "/mind" : "/post";
    let userNickname = "";

    const [commentDB, setCommentDB] = useState([]);
    const [userDB, setUserDB] = useState([]);
    const [postDB, setPostDB] = useState([]);
    const params = useParams();
    let nowPost = {};

    useEffect(() => {
        axios.get('http://localhost:3333/api/post')
            .then((res) => {
                setPostDB([...res.data]);
            }).catch(error => console.error('Error:', error));
    }, [])
    
    useEffect(() => {
        axios.get('http://localhost:3333/api/comment')
            .then((res) => {
                setCommentDB([...res.data]);
            }).catch(error => console.error('Error:', error));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3333/api/user')
            .then((res) => {
                setUserDB([...res.data]);
            }).catch(error => console.error('Error:', error));
    }, [])

    for (let i = 0; i < commentDB.length; i++) {
        if (Number(params.id)  === commentDB[i].id_post) {
            myComment.push(
            <p>{commentDB[i].body}</p>
            );
        }
    }

    for (let t = 0; t < postDB.length; t++) {
        if (Number(params.id) === postDB[t].id_post) {
            nowPost = {
                detail_post : postDB[t].id_post,
                detail_user : postDB[t].id_user,
                detail_title : postDB[t].title,
                detail_body : postDB[t].body,
                detail_anonymity : postDB[t].anonymity
            }
        }
    }
    
    //현재 로그인한 유저 값 필요
    for (let t = 0; t < userDB.length; t++) {
        if ( 2 === userDB[t].id_user) {
            userNickname = userDB[t].nickname
        }
    }

    const goToEdit = (item) => {
        navigate(`/edit/${item.detail_post}`, {
            state: {
                id_post: item.detail_post,
                id_user: item.detail_user,
                title: item.detail_title,
                body: item.detail_body,
                anonymity: item.detail_anonymity
            }
        })
    }

    const newSaveComment = (item) => {
        // 임시 id_user
        let body = item.body;
        let id_user = 2;
        let id_post = nowPost.detail_post;
        fetch('http://localhost:3333/api/comment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //테스트용 user 값 (item)
                body: body,
                id_user: id_user,
                id_post: id_post
            })
        }).then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        }).catch(error => console.error('Error:', error.message)).then(
               alert("저장되었습니다")
        );
        window.location.replace(`/detail/${nowPost.detail_post}`);
    }

    //임시 user id ( id_post : 88) 
    let userId = 2;
    return (
            <div className="detail-page">
                <div className="detail-bar">
                    <NavLink to={backButton}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                    <div className="button-right">
                        <span><input type="submit" value={userNickname} id="detail-submit"
                            onClick={(e) => {
                                e.preventDefault()
                                
                                if (nowPost.detail_user === userId) {
                                    goToEdit(nowPost)
                                }
                            }} /></span>
                    </div>
                </div>
                <div className="detail-title-bar"><p>
                    {nowPost.detail_title}</p>
                </div>
                <div className="detail-textarea">
                    <p>{nowPost.detail_body}</p>
                </div>
                <div>
                    <div className="detail-comment-input">
                        <div>
                            <form className="detail-form" onSubmit={(e) => { e.preventDefault();
                            let item = {
                                id_post : nowPost.detail_post,
                                // 임시 user id 값
                                id_user : userId,
                                body : e.target.body.value
                            }
                                newSaveComment(item);
                             }}>
                                <p className="input-text"><input placeholder='댓글을 입력해주세요' name="body" />
                                </p>
                                <p className="button-right"><input id="detail-comment-submit" type="submit" value="댓글쓰기" /></p>
                            </form>
                        </div>
                    </div>
                </div>
                {[...myComment].reverse().map((item) => <div className="detail-comment-bar">{item}</div>)}
            </div>
    )
}