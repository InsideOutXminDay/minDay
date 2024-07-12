import React, { useState, useEffect } from "react";
import '../styles/post.css';
import { NavLink, useNavigate } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import axios from 'axios';

export default function Post() {

    const [postdb, setPostdb] = useState([]);
    let myDB = [];

    useEffect(() => {
        axios.get('http://localhost:4000/api/post')
            .then((res) => {
                // console.log(res.data);
                setPostdb([...res.data]);
            }
            ).catch(error => console.error('Error:', error));
    }, [])

    //로그인 유저 임시 id 값
    let _userid = 11;

    const navigate = useNavigate();
    const goTodetail = (item) => {
        navigate(`/detail/${item.id_post}`, {
            state: {
                id_post: item.id_post,
                id_user: item.id_user,
                title: item.title,
                body: item.body,
                anonymity: item.anonymity
            }
        })
    }

    const goToNew = () => {
        navigate(`/new/${_userid}`, { state: { lastPage: "/post" } })
    }

    for (let i = 0; i < postdb.length; i++) {
        let p = postdb[i];
        if (p.anonymity == 0) {
            myDB.push(
                <NavLink to={"/detail/" + p.id_post}
                    key={p.id_post}
                    onClick={(e) => {
                        e.preventDefault()
                        goTodetail(p)
                    }}>
                    <div className="post-card">
                        <h2>{p.title}</h2>
                        <p>{p.body}</p>
                    </div>
                </NavLink>
            );
        } else { continue }
    }

    return (
        <div className="post-page">
            {myDB.slice(-1)}
            <div className="guide-card">
                <h3>일반 커뮤니티</h3>
                <p>서로의 멘탈 관리에 도움이 될 수 있도록 이야기를 공유해 보세요!</p>
                <button id="new-post-create"><NavLink to={"/new/" + _userid}
                    onClick={(e) => { e.preventDefault(); goToNew() }}>
                    <FaRegPenToSquare id="post-create-icon">작성</FaRegPenToSquare>
                </NavLink></button>
            </div>
            {myDB.slice(0,(myDB.length-1)).reverse()}
        </div>
    )
}