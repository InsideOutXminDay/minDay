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

    let myDB = [];

    for (let i = 0; i < postdb.length; i++) {
        let p = postdb[i];
        myDB.push(
            <NavLink to={"/detail/" + p.id_post}>
                <div className="post-card">
                    <h2>{p.title}</h2>
                    <p>{p.body}</p>
                </div>
            </NavLink>
        );
    }

    //로그인 유저 임시 id 값
    let _userid = 1;

    return (
        <div className="post-page">
            {myDB[0]}
            <div className="guide-card">
                <h3>일반 커뮤니티</h3>
                <p>서로의 멘탈 관리에 도움이 될 수 있도록 이야기를 공유해 보세요!</p>
                <button id="new-post-create"><NavLink to={"/new/" + _userid}>
                    <FaRegPenToSquare id="post-create-icon">작성</FaRegPenToSquare>
                </NavLink></button>
            </div>
            {myDB.slice(1)}
        </div>
    )
}