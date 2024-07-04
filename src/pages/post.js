import React from "react";
import '../styles/post.css';
import { NavLink } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function Post() {

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
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test
        test test test test test test`,
        anonymity: false
    },
    {
        id_post: 2,
        id_user: 6,
        title: "test",
        body: `test test test test test test`,
        anonymity: false
    }, {
        id_post: 3,
        id_user: 2,
        title: "test",
        body: `test test test test test test`,
        anonymity: false
    }];

    //로그인 유저 임시 id 값
    let _id = 1;
    return (
        <div className="post-page">
            <div className="post-card">
                <h2>test</h2>
                <p> test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test
                    test test test test test test</p>
            </div>
            <div className="guide-card">
                <h3>일반 커뮤니티</h3>
                <p>서로의 멘탈 관리에 도움이 될 수 있도록 이야기를 공유해 보세요!</p>
                <button id="new-post-create"><NavLink to={"/new/"+_id}>
                <FaRegPenToSquare id="post-create-icon">작성</FaRegPenToSquare>
                </NavLink></button>
            </div>

            <div className="post-card">
                <h2>test</h2>
                <p>test test test test test test </p>
            </div>
            <div className="post-card">
                <h2>test</h2>
                <p>test test test test test test </p>
            </div>
        </div>
    )
}