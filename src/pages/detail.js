import React, { useState, useEffect } from "react";
import '../styles/detail.css';
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";
import axios from 'axios';


export default function Detail() {

    let myComment = [];
    const location = useLocation();
    const postInfo = { ...location.state };
    let backButton = postInfo.anonymity ? "/mind" : "/post";
    let userNickname = "";

    const [commentDB, setCommentDB] = useState([]);
    const [userDB, setUserDB] = useState([]);
    const [postDB, setPostDB] = useState([]);
    const params = useParams();
    let detailTitle = '';
    let detailBody = '';

    useEffect(() => {
        axios.get('http://localhost:3333/api/comment')
            .then((res) => {
                // console.log(res.data);
                setCommentDB([...res.data]);
            }
            ).catch(error => console.error('Error:', error));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3333/api/user')
            .then((res) => {
                // console.log(res.data);
                setUserDB([...res.data]);
            }
            ).catch(error => console.error('Error:', error));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3333/api/post')
            .then((res) => {
                // console.log(res.data);
                setPostDB([...res.data]);
            }
            ).catch(error => console.error('Error:', error));
    })

    for (let i = 0; i < commentDB.length; i++) {

        if (postInfo.id_post === commentDB[i].id_post) {
            myComment.push(
                <div className="detail-comment-bar">
                    <p>{commentDB[i].body}</p>
                </div>
            );
        }
    }

    for (let t = 0; t < userDB.length; t++) {
        if (postInfo.id_user === userDB[t].id_user) {
            userNickname = userDB[t].nickname
        }
    }

    for (let t = 0; t < postDB.length; t++) {
        if (Number(params.id) === postDB[t].id_post) {
            detailTitle = postDB[t].title;
            detailBody = postDB[t].body;
            
        }
    }

    const navigate = useNavigate();
    const goToEdit = (item) => {
        navigate(`/edit/${item.id_post}`, {
            state: {
                id_post: item.id_post,
                id_user: item.id_user,
                title: item.title,
                body: item.body,
                anonymity: item.anonymity
            }
        })
    }

    const newSaveComment = (item) => {
        //db 에 저장되는 것 구현 필요
        console.log(
            `저장되었습니다 포스트 번호 : ${postInfo.id_post} body : ${item.body} 
        `)
    }

    //임시 user id (첫번째 글 user id) 
    let userId = 5;
    return (
        <div>
            <div className="detail-page">
                <div className="detail-bar">
                    <NavLink to={backButton}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                    <div className="button-right">
                        <span><input type="submit" value={userNickname} id="detail-submit"
                            onClick={(e) => {
                                e.preventDefault()
                                if (postInfo.id_user === userId) {
                                    goToEdit(postInfo)
                                }
                            }} /></span>
                    </div>
                </div>
                <div className="detail-title-bar"><p>
                    {detailTitle}</p>
                </div>
                <div className="detail-textarea">
                    <p>{detailBody}</p>
                </div>
                <div>
                    <div className="detail-comment-input">
                        <div>
                            <form className="detail-form" onSubmit={(e) => { e.preventDefault();
                            let item = {
                                id_post : postInfo.id_post,
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
                {myComment}
            </div>
        </div>
    )
}