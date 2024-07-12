import { useEffect, useState } from 'react';
import '../styles/Paragraph.css'
import { ParagraphDatas } from '../util'
export default function Paragraph(){
    const [paragraph, setParagraph] = useState(null);
    console.log("front")
    
    useEffect(() => {
        const p_num = Math.floor(Math.random() * ParagraphDatas.length);
        setParagraph(ParagraphDatas[p_num]);
    }, []);

    return(
        <div className='Paragraph'>
            <div className='para en'>
                {paragraph ? paragraph.article : "No article available"}
            </div>
            <div className='para ko'>
                {paragraph ? paragraph.ver_ko : "No article available"}
            </div>
            <div className='para writer'>
                -{paragraph ? paragraph.writer : "No writer available"}-
            </div>

        </div>
    )
}

////////////////////////////////db 연결///////////////////////////////////////

// import { useEffect, useState } from 'react';
// import '../styles/Paragraph.css'
// import { ParagraphDatas } from '../util'
// import axios from 'axios';

// export default function Paragraph(){

//     const [paragraph, setParagraph] = useState(null);
//     console.log("db")

    
//     useEffect(() => {
//         axios.get('http://localhost:4000/api/paragraph')
//             .then((res) => {
//                 setParagraph(res.data)
//             }
//             ).catch(error => console.error('Error:', error));
//     }, []);
//     const p_num = Math.floor(Math.random() * ParagraphDatas.length);


//     return(
//         <div className='Paragraph'>
//             <div className='para en'>
//                 {paragraph ? paragraph[p_num].article : "No article available"}
//             </div>
//             <div className='para ko'>
//                 {paragraph ? paragraph[p_num].ver_ko : "No article available"}
//             </div>
//             <div className='para writer'>
//                 -{paragraph ? paragraph[p_num].writer : "No writer available"}-
//             </div>

//         </div>
//     )
// }

////////////////////////////DB 생성 및 작성 내용//////////////////////
// CREATE TABLE paragraph (
// 	`id_paragraph` int NOT NULL AUTO_INCREMENT PRIMARY KEY,
//   `article` varchar(200) NOT NULL UNIQUE,
//   `ver_ko` varchar(200) NOT NULL UNIQUE,
//   `writer` varchar(20) NOT NULL
// );
    
    
// insert into paragraph(article, ver_ko, writer) values(
//     "Success is not final, failure is not fatal: It is the courage to continue that counts.", "성공은 최종적이지 않고, 실패는 치명적이지 않습니다: 계속하는 용기가 중요합니다.","Winston Churchill"
// );
// insert into paragraph(article, ver_ko, writer) values(
//    "The only true wisdom is in knowing you know nothing.", "진정한 지혜는 네가 아무 것도 모른다는 것을 알 때 나타납니다.", "Socrates"
// );
// insert into paragraph(article, ver_ko, writer) values(
//     "Be yourself; everyone else is already taken.", "네 자신이 되어라; 다른 사람들은 이미 누군가입니다.", "Oscar Wilde"
// );
// insert into paragraph(article, ver_ko, writer) values(
//    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", "계속해서 너를 다른 무언가로 만들려는 세상에서 자신을 유지하는 것이 가장 큰 성취입니다.", "Ralph Waldo Emerso"
// );
// insert into paragraph(article, ver_ko, writer) values(
//     "The greatest glory in living lies not in never falling, but in rising every time we fall.", "살아가는 데 있어 가장 큰 영광은 결코 넘어지지 않는 데가 아니라 넘어질 때마다 일어나는 데 있습니다.", "Nelson Mandela"
// );
