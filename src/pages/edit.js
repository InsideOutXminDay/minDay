import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import '../styles/new.css';
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

export default function Edit() {
    //로그인 유저 임시 id 값
    var myId = 1;
    return (
        <div>
            <div className="edit-page">
                <form name="editCreate"
                // onSubmit={(e)=>{e.preventDefault();}}
                >
                    <div className="edit-bar">
                        <NavLink to={"/post"}><IoCaretBackOutline id="new-back"></IoCaretBackOutline></NavLink>
                        <div className="button-right">
                            <span><input type="submit" value="저장하기" id="new-submit" /></span>
                        </div>
                    </div>
                    <div className="edit-title-bar"><p>
                        <input type="text" placeholder='TITLE' name="title" /></p>
                    </div>
                    <div className="new-textarea">
                        <p><textarea placeholder='contents' name="body"></textarea></p>
                    </div>
                </form>
            </div>
        </div>
    )
};