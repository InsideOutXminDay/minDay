import React from "react";
import '../styles/detail.css';
import { NavLink, useLocation } from "react-router-dom";
import { IoCaretBackOutline } from "react-icons/io5";



export default function Detail() {

    let myComment = [];
    const location = useLocation();
    const postInfo = { ...location.state };
    let backButton = postInfo.anonymity ? "/mind" : "/post";
    let userNickname = "";

    for (let i = 0; i < commentDB.length; i++){
        
        if (postInfo.id_post === commentDB[i].id_post) {
            myComment.push(
                <div className="detail-comment-bar">
                    <p>{commentDB[i].body}</p>
                </div>
            );
        }
    }

    for(let t = 0; t < userDB.length; t++){
        if(postInfo.id_user === userDB[t].id_user){
           userNickname = userDB[t].nickname
        }
    }

    return (
        <div>
            <div className="detail-page">
                <div className="detail-bar">
                    <NavLink to={backButton}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                    <div className="button-right">
                        <span><input type="submit" value={userNickname} id="detail-submit" /></span>
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
                            <form className="detail-form" onSubmit={(e)=>{e.preventDefault();}}>
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