import React from "react";
import '../styles/post.css';
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";




export default function Post() {

    let myDB = [];
    const navigate = useNavigate();
    const goToDetail = (item)=>{
        navigate(`/detail/${item.id_post}`,{
            state:{
                id_post: item.id_post,
                id_user: item.id_user,
                title: item.title,
                body: item.body,
                anonymity: item.anonymity
            }});
    }

    for (let i = 0; i < postdb.length; i++) {
        let p = postdb[i];
        let pData = {
                id_post: p.id_post,
                id_user: p.id_user,
                title: p.title,
                body: p.body,
                anonymity: p.anonymity
        };
        myDB.push(
                <div className="post-card" onClick={()=>{
                    goToDetail(pData);
                    }}>
                    <h2>{p.title}</h2>
                    <p>{p.body}</p>
                </div>
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