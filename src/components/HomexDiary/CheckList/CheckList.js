import { useNavigate } from "react-router-dom";
import '../../../styles/HomexDiary/CheckList/CheckList.css'
import CheckItem from "./CheckItem";
import { user_id } from "../../../util";
import axios from "axios";

export default function CheckList({initData}){
    const navigate = useNavigate();
    const onClickUpdate=()=>{
        navigate("/ask")
    }

    // const onClickCreate = async() => {
    //     const state = {
    //       sleep:{content:"22:00"},
    //       wake: {content:"06:00"},
    //       phone: {content:3},
    //       satisfaction: {content:"맛있는거 먹기"},
    //       hobby: {content:"달리기"},
    //       exercise: {content:3},
    //       meal:{content:"식사 잘 챙겨먹기"},
    //       rest: {content:"충분한 휴식 취하기"}}
    //     try{
    //         const res = await axios.post(`http://localhost:5000/createchecklist`, {user_id,state});
    //         console.log(res.data)
    //     }catch(err){
    //         console.error(err)
    //     }
    // }
    
    return(
        <div className="CheckList">
            <div className="title-wrapper">
                <h4> Checking for Me 🌱</h4>
                <div className="button-section"><button onClick={onClickUpdate}>수정하기</button></div>
                {/* <div className="button-section"><button onClick={onClickCreate}>생성하기</button></div> */}
            </div>
            <div className='list-wrapper-wide'>
                {
                    initData.map(
                        (item) => (
                            <CheckItem
                            key={item.id_askcheck}
                            {...item}/>
                        ))
                }
               
                
                  
            </div>
        </div>
    )
}