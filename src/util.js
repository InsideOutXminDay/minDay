export function FindData(datas,user_id){
    return datas.filter(item => item.id_user == user_id);
}