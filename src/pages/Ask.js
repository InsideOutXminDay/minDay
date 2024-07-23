import { useState, useEffect } from "react";
import StateCheck from "../components/Ask/StateCheck";
import { FindData, user_id } from "../util";
import axios from "axios";

export default function Ask({ token }){

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
        axios.get('http://localhost:5000/askchecks', {
            headers: { authorization: `Bearer ${token}` },
          })

            .then((res) => {
                const foundData = FindData(res.data)
                setInitData(convertListDataToObject(foundData))
            }
            ).catch(error => console.error('Error:', error));
    }, []);


    const onUpdate = async(state) => {
        try{
            const res = await axios.post(`http://localhost:5000/updatechecklist`, 
                {state},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }
    const onCreate = async(state) => {
        try{
            const res = await axios.post(`http://localhost:5000/createchecklist`, 
                {user_id,state},
                {
                    headers: { authorization: `Bearer ${token}` },
                }
            );
            console.log(res.data)
        }catch(err){
            console.error(err)
        }
    }
    console.log(initData)

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