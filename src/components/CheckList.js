import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import '../styles/CheckList.css'
import CheckItem from "./CheckItem";

export default function CheckList({initData}){
    const navigate = useNavigate();
    
    return(
        <div className="CheckList">
            <div className="title-wrapper">
                <h4> Checking for Me 🌱</h4>
                <div><button onClick={()=>{navigate("/")}}>수정하기</button></div>
            </div>
           
            <div className='list-wrapper-wide'>
                {
                    initData.map(
                        (item) => (
                            <CheckItem
                            key={item.id_ask}
                            {...item}/>
                        ))
                }
               
                
                  
            </div>
        </div>
    )
}