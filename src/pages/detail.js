import React from "react";
import '../styles/detail.css';
import { NavLink } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";


export default function Detail() {
    // 임시 유저 닉네임값
    var myNickname = "testUser";



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
                    제목입니다</p>
                </div>
                <div className="detail-textarea">
                    <p>내용입니다 </p>
                </div>
                <div>
                <div className="detail-comment-input">
                    <div>
                    <form className="detail-form">
                        <p className="input-text"><input placeholder='댓글을 입력해주세요' name="body" />
                    </p>
                   
                    <p className="button-right"><input  id="detail-comment-submit"  type="submit"  value="댓글쓰기" /></p>
                    </form>
                    </div>
                </div>
                </div>
                <div className="detail-comment-bar">
                    <p>댓글입니다</p>
                </div>
            </div>
        </div>
    )
}