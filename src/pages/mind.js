import React from "react";
import '../styles/post.css';
import { NavLink } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";

export default function Mind() {


    //로그인 값 user id 로 수정해야함
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
                    test test test test test test</p>
            </div>
            <div className="guide-card">
                <h3>고민 커뮤니티</h3>
                <p>익명으로 서로의 고민을 나눠보며 숨은 위로와 힐링을 받아보세요!</p>

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