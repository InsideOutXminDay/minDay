import React from 'react';
import ReactPlayer from 'react-player';
import '../../styles/Contents/ContentsView.css';

const ContentsView = ({ subCategory, onBack }) => {
  return (
    <div className="contents-view">
      <button onClick={onBack} className="back-button2">🔙</button>
      <h2>{subCategory.name}</h2>
      <div className="content">
        <ReactPlayer
          url={subCategory.video}
          controls={true}
          width="940px"
          height="600px"
          className="react-player"
        />
      </div>
    </div>
  );
};

export default ContentsView;
