import { useState, useEffect } from "react";
import StateCheck from "../components/Ask/StateCheck";
import { FindData, user_id } from "../util";
import axios from "axios";

export default function Ask(){

    const [initData, setInitData] = useState([]);

    const convertListDataToObject = (arr) => {
        const result = {};
        arr.forEach(item => {
          const { type, ...rest } = item.Askcheck;
          rest.id_user = item.User.id_user;
          result[type] = rest;
        });
        return result;
      }
      
      useEffect(() => {
        axios.get('http://localhost:5000/askchecks')

            .then((res) => {
                const foundData = FindData(res.data)
                console.log("ask foundData", foundData)
                setInitData(convertListDataToObject(foundData))
            }
            ).catch(error => console.error('Error:', error));
    }, []);


    const onUpdate = async(id_user, content, isdone, type, id_askcheck=null) => {
        const address = id_askcheck ?'update':'create';
        try{
            const res = await axios.post(`http://localhost:5000/${address}checklist`, 
                {
                    id_user,
                    content,
                    isdone,
                    type,
                    id_askcheck 
                }
              );
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }
    const onCreate = async(state) => {
        try{
            const res = await axios.post(`http://localhost:5000/createchecklist`, {user_id,state});
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }

    return (
        <div>
            <div className="Ask">
                <div className="logo-section">
                    <img src="/logo_full.png"/>
                    <p>목표를 설정해 만족스러운 하루를 만들어보세요!😊</p>
                </div>
                <StateCheck initData={initData}  onUpdate={initData.sleep?onUpdate:onCreate}/>
            </div>
        </div>
    );
}