import '../../styles/new_DiaryPage/EmotionItem.css'
export default function EmotionItem({ id, img, name, onClick, isSelected }){
    const handleOnClick = () => {
        onClick(id);
    };
    return(
        <div className={[
            "EmotionItem",
            isSelected ? `EmotionItem-on` : `EmotionItem-off`,
          ].join(" ")}
          onClick={handleOnClick}
        >
          <span>{name}</span>
          <img alt={`emotion${id}`} src={img} />
          
        </div>
    )
}