import React from "react";
import '../styles/detail.css';
import { NavLink, useLocation } from "react-router-dom";
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

const postdb = [{
    id_post: 1,
    id_user: 5,
    title: "test",
    body: `test test test test test test
    test test test test test test
    test test test test test test
    test test test test test test
    test test test test test test
    test test test test test test
    test test test test test test`,
    anonymity: true
},
{
    id_post: 2,
    id_user: 6,
    title: "test",
    body: `test test test test test test`,
    anonymity: true
}, {
    id_post: 3,
    id_user: 2,
    title: "test",
    body: `test test test test test test`,
    anonymity: true
}];



// 임시 유저 닉네임값
var myNickname = "testUser";



export default function Detail() {

    let myComment = [];
    const location = useLocation();
    const postInfo = { ...location.state };

    for (let i = 0; i < commentDB.length; i++) {
        let p = commentDB[i];
        if (postInfo.id_post === commentDB[i].id_post) {
            myComment.push(
                <div className="detail-comment-bar">
                    <p>{commentDB[i].body}</p>
                </div>
            );
        }
    }

    return (
        <div>
            <div className="detail-page">

                <div className="detail-bar">
                    <NavLink to={"/post"}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                    <div className="button-right">
                        <span><input type="submit" value={myNickname} id="detail-submit" /></span>
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
                            <form className="detail-form">
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