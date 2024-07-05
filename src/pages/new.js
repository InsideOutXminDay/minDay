import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import '../styles/new.css';



export default function New() {
    const [community, setCommunity] = useState("post");
    const [unCheck, setUnCheck] = useState(<input type="hidden" name="anonymity" value="post"/>);

    const MyCheckbox = (checked) => {
        if (checked) {
            setCommunity("mind");
            setUnCheck(null);
        } else if (!checked){
            setCommunity("post")
            setUnCheck(<input type="hidden" name="anonymity" value="post"/>);
        }
    }

    return (
        <div className="new-page">
            <form name="newCreate" onSubmit={(e)=>{e.preventDefault();
                // 출력 확인용
                // console.log(
                //     "anonymity(hidden) : " + document.forms[0].anonymity.value,
                //     "title : "+document.forms[0].title.value,
                //     "body : "+document.forms[0].body.value);
            }}>
                <div className="new-bar">
                    <NavLink to={"/post"}><IoCaretBackOutline id="post-back"></IoCaretBackOutline></NavLink>
                        <div className="button-right">
                            <label className="checkbox-right">
                                <input type="checkbox" id="checkboxId" value={community}
                                  onClick={(e) => { 
                                    MyCheckbox(e.target.checked); }} name="anonymity" />익명
                            </label>
                            {unCheck}
                        <span><input type="submit" value="저장하기" id="new-submit"/></span>
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

