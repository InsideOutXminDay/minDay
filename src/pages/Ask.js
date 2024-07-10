import { useContext, useState, useEffect } from "react";
import { DiaryStateContext, DiaryDispatchContext } from "../App";
import StateCheck from "../components/StateCheck";
import { FindData } from "../util";

export default function Ask(){
    const { onListUpdate,onListCreate } = useContext(DiaryDispatchContext);
    const { data_l } = useContext(DiaryStateContext);
    const [initData, setInitData] = useState([]);

    useEffect(() => {     
        // Filtering initial data
        const foundData = FindData(data_l)
        setInitData(foundData);
    }, [data_l]);

    const onUpdate = (id_ask, id_user, content, isdone) => {
        initData.length?
        onListUpdate(id_ask, id_user, content, isdone)
        :onListCreate(id_ask, id_user, content, isdone)
    }

    return (
        <div>
            <div>
                <StateCheck initData={initData} user_id={user_id} onUpdate={onUpdate}/>
            </div>
        </div>
    );
}