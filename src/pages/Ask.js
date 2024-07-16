import { useContext, useState, useEffect } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import StateCheck from "../components/Ask/StateCheck";
import { FindData } from "../util";

export default function Ask(){
    const { onListUpdate,onListCreate } = useContext(DiaryDispatchContext);
    const { data_l } = useContext(DiaryStateContext);
    const [initData, setInitData] = useState([]);

    

    const convertListDataToObject = (arr) => {
        const result = {};
        arr.forEach(item => {
          const { type, ...rest } = item;
          result[type] = rest;
        });
        return result;
      }
      
    useEffect(() => {     
        const foundData = FindData(data_l)
        // setInitData(foundData)
        setInitData(convertListDataToObject(data_l));
    }, [data_l]);

    const onUpdate = (id_ask, id_user, content, isdone, type) => {
        initData.sleep?
        onListUpdate(id_ask, id_user, content, isdone, type)
        :onListCreate(id_ask, id_user, content, isdone, type)
    }

    return (
        <div>
            <div>
                <StateCheck initData={initData}  onUpdate={onUpdate}/>
            </div>
        </div>
    );
}