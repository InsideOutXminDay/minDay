import DiaryEditor from "../components/DiaryEditor"
import Header from "../components/Header"
export default function NewDiary(){
    return (
        <div style={{display:"flex"}}>
            <Header/>
            <DiaryEditor/>
        </div>
    )
}