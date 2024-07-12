import React, {useState, useEffect} from "react";
import '../styles/post.css';
import { NavLink, useNavigate  } from "react-router-dom";
import { FaRegPenToSquare } from "react-icons/fa6";
import axios from 'axios';

export default function Mind() {

    const navigate = useNavigate();
    const [postdb, setPostdb] = useState([]);
    let myDB = [];

    useEffect(() => {
        axios.get('http://localhost:4000/api/mind')
            .then((res) => {
            setPostdb([...res.data]); }
        ).catch(error => console.error('Error:', error));
}, [])


    const goTodetail = (item)=>{
        navigate(`/detail/${item.id_post}`, {state: {
            id_post : item.id_post,
            id_user : item.id_user,
            title : item.title,
            body : item.body,
            anonymity : item.anonymity
        }})
    }

    const goToNew = ()=>{
        navigate(`/new/${_userid}`, {state:{lastPage:"/mind"}})
    }

    for (let i = 0; i < postdb.length; i++) {
        let p = postdb[i];
        if(p.anonymity == 1){
        myDB.push(
            <NavLink to={"/detail/" + p.id_post} 
            key={p.id_post}
            onClick={(e)=>{
                e.preventDefault()
                goTodetail(p)
                }}>
                <div className="post-card">
                    <h2>{p.title}</h2>
                    <p>{p.body}</p>
                </div>
            </NavLink> 
        );}
        else{continue}
    }

    //로그인 유저 임시 id 값
    let _userid = 11;
    
    return (
        <div className="post-page">
            {myDB.slice(-1)}
            <div className="guide-card">
                <h3>고민 커뮤니티</h3>
                <p>익명으로 서로의 고민을 나눠보며 숨은 위로와 힐링을 받아보세요!</p>
                <button id="new-post-create"><NavLink to={"/new/" + _userid}
                 onClick={(e)=>{e.preventDefault(); goToNew()}}>
                    <FaRegPenToSquare id="post-create-icon">작성</FaRegPenToSquare>
                </NavLink></button>
            </div>
            {myDB.slice(0,(myDB.length-1)).reverse()}
        </div>
    )
}