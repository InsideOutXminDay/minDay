import React from "react";
import '../styles/detail.css';
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";


const commentDB = [
    {
        id_comment: 1,
        body: "test comment 1",
        id_user: 3,
        id_post: 1
    },
    {
        id_comment: 2,
        body: "test comment 2",
        id_user: 4,
        id_post: 2
    },
    {
        id_comment: 3,
        body: "test comment 3",
        id_user: 1,
        id_post: 3
    },
    {
        id_comment: 1,
        body: "test comment 1",
        id_user: 3,
        id_post: 1
    },
    {
        id_comment: 2,
        body: "test comment 2",
        id_user: 4,
        id_post: 2
    },
    {
        id_comment: 3,
        body: "test comment 3",
        id_user: 1,
        id_post: 3
    }
];

const userDB = [
    {
        id_user: 1,
        inputid: "test01",
        nickname: "test01Nick",
        email: "test01@test.com",
        password: "nnnnnnnn"
    },
    {
        id_user: 2,
        inputid: "test02",
        nickname: "test02Nick",
        email: "test03@test.com",
        password: "nnnnnnnn"
    },
    {
        id_user: 3,
        inputid: "test03",
        nickname: "test03Nick",
        email: "test03@test.com",
        password: "nnnnnnnnnn"
    },
    {
        id_user: 5,
        inputid: "test05",
        nickname: "test05Nick",
        email: "test05@test.com",
        password: "nnnnnnnnnn"
    },
    {
        id_user: 6,
        inputid: "test06",
        nickname: "test06Nick",
        email: "test06@test.com",
        password: "nnnnnnnnnn"
    }
];



export default function Detail() {

    let myComment = [];
    const location = useLocation();
    const postInfo = { ...location.state };
    let backButton = postInfo.anonymity ? "/mind" : "/post";
    let userNickname = "";

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
                    {postInfo.title}</p>
                </div>
                <div className="detail-textarea">
                    <p>{postInfo.body}</p>
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