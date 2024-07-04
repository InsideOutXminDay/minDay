import React, { useState } from "react";
import { IoCaretBackOutline } from "react-icons/io5";
import '../styles/new.css';



export default function New() {
    const [community, setCommunity] = useState("post");
    
    const MyCheckbox = (checked)=>{
        if (checked) {
            console.log("checked / mind page");
            setCommunity("mind");
        } else {
            console.log("check false / post page");
            setCommunity("post")
        }
    }
    
    return (
        <div className="new-page">
            <form>
                <div className="new-bar">
                    <IoCaretBackOutline id="new-back"></IoCaretBackOutline >
                    <div className="button-right">
                        <label className="checkbox-right">
                            <input type="checkbox" id="checkboxId" 
                            onClick={(e)=>{MyCheckbox(e.target.checked);}}/>익명</label>
                        <span><input type="submit" value="저장하기" /></span>
                    </div>
                </div>
                <div className="new-title-bar"><p>
                    <input type="text" placeholder='TITLE' name="title" /></p>
                </div>
                <div className="new-textarea">
                    <p><textarea placeholder='contents' name="body"></textarea></p>
                </div></form>
        </div>
    )
}

