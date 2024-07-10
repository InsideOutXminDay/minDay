import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import '../styles/new.css';


export default function New() {
    const [community, setCommunity] = useState("post");
    const [unCheck, setUnCheck] = useState(<input type="hidden" name="anonymity" value="post" />);
    const location = useLocation();
    const postInfo = { ...location.state };
    let backButton = postInfo.lastPage;

    const navigate = useNavigate();
    const MyCheckbox = (checked) => {
        if (checked) {
            setCommunity("mind");
            setUnCheck(null);
        } else if (!checked) {
            setCommunity("post")
            setUnCheck(<input type="hidden" name="anonymity" value="post" />);
        }
    }

    const newSave = async (item) => {
        let id_user = item.id_user;
        let title = item.title;
        let body = item.body;
        let anonymity = item.anonymity ? 1 : 0;

        await fetch('http://localhost:3333/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                //테스트용 user 값 (item)
                id_user: id_user,
                title: title,
                body: body,
                anonymity: anonymity
            })
        }).then(async (response) => {
            const data = await response.json();
            console.log(`data.insertId : ${data.insertId}`);
            setInsert(Number(data.insertId));
            alert("저장되었습니다");
            navigate(`/detail/${Number(data.insertId)}`);
            if (!response.ok) {
                throw new Error(`error! status: ${response.status}`);
            }})
            .catch(error => console.error('Error:', error.message))
        }
  
    return (
        <div className="new-page">
            <form name="newCreate" onSubmit={(e) => {
                e.preventDefault();
                let item = {
                    //테스트용 user 값
                    id_user: 2,
                    title: e.target.title.value,
                    body: e.target.body.value,
                    anonymity: e.target.anonymity.value
                }
                newSave(item)
            }}>
                <div className="new-bar">
                    <NavLink to={backButton}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                    <div className="button-right">
                        <label className="checkbox-right">
                            <input type="checkbox" id="checkboxId" value={community}
                                onClick={(e) => {
                                    MyCheckbox(e.target.checked);
                                }} name="anonymity" />익명
                        </label>
                        {unCheck}
                        <span><input type="submit" value="저장하기" id="new-submit" /></span>
                    </div>
                </div>
                <div className="new-title-bar"><p>
                    <input type="text" placeholder='TITLE' name="title" /></p>
                </div>
                <div className="new-textarea">
                    <p><textarea placeholder='contents' name="body"></textarea></p>
                </div>
            </form>
        </div>
    )
}

