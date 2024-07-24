import '../../styles/HomexDiary/EmotionItem.css'
export default function EmotionItem({ id_emotionlist, emotionimg, emotionname, onClick, isSelected }){
    const handleOnClick = () => {
        onClick(id_emotionlist);
    };
    return(
        <div className={[
            "EmotionItem",
            isSelected ? `EmotionItem-on` : `EmotionItem-off`,
          ].join(" ")}
          onClick={handleOnClick}
        >
          <span>{emotionname}</span>
          <img alt={`emotion${id_emotionlist}`} src={emotionimg} />
          
        </div>
    )
}