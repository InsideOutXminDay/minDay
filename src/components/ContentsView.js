import React from 'react';
import '../styles/ContentsView.css';

const ContentsView = ({ subCategory, onBack }) => {
  return (
    <div className="contents-view">
      <button onClick={onBack} className="back-button2">🔙</button>
      <h2>{subCategory.name}</h2>
      <div className="content">
        <video controls>
          <source src={subCategory.video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
};

export default ContentsView;
