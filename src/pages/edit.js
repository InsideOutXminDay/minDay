import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom";
import '../styles/edit.css';

const postdb = [{
    id_post: 1,
    id_user: 5,
    title: "test",
    body: `test test test test test test
    test test test test test test`,
    anonymity: false
}, {
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

    //로그인 유저 임시 id 값 (첫번째 글)
    var myId = 5;

export default function Edit() {
    const location = useLocation();
    const postInfo = { ...location.state };
    const [newTitle, setTitle] = useState(postInfo.title);
    const [newBody, setBody] = useState(postInfo.body);

    const editSave = (item)=>{
        //db 에 저장되는 것 구현 필요
        console.log(
        `저장되었습니다 title : ${item.title}
        body : ${item.body} 익명 : ${item.anonymity}
        `)}


    return (
        <div>
            <div className="edit-page">
                <form name="editCreate"
                onSubmit={(e)=>{e.preventDefault();}}
                >
                    <div className="edit-bar">
                        <NavLink to={"/post"}><IoCaretBackOutline id="new-back"></IoCaretBackOutline></NavLink>
                        <div className="button-right">
                            <span><input type="submit" value="저장하기" id="new-submit" 
                            onClick={(e)=>{e.preventDefault();
                                let item = {
                                    //테스트용 user 정보값 (첫번째 글)
                                    id_post : postInfo.id_post,
                                    id_user : myId,
                                    title : newTitle,
                                    body : newBody,
                                    anonymity : postInfo.anonymity
                                }
                                 editSave(item); }}/></span>
                        </div>
                    </div>
                    <div className="edit-title-bar"><p>
                        <input type="text" placeholder='TITLE' name="title" value={newTitle}
                        onChange={(e)=>{ setTitle(e.target.value);
                          }}/></p>
                    </div>
                    <div className="edit-textarea">
                        <p><textarea placeholder='contents' name="body" value={newBody} 
                        onChange={(e)=>{ setBody(e.target.value);
                          }}></textarea></p>
                    </div>
                </form>
            </div>
        </div>
    )
};