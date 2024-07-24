import React from 'react';
import '../../styles/Contents/SubCategory.css';

const SubCategory = ({ category, subCategories, onBack, onSelectSubCategory }) => {
  return (
    <>
      <div className="sub-category-header">
        <h2>{category.content_name}</h2>
        <button onClick={onBack} className="back-button1">🔙</button>
      </div>
      <div className="sub-category-grid">
        {subCategories.map((subCategory) => (
          <div key={subCategory.subcontent_id} className="sub-category-item" onClick={() => onSelectSubCategory(subCategory)}>
            <img src={subCategory.subcontent_image} alt={subCategory.subcontent_name} className="sub-category-image" />
            <div className="sub-category-name">{subCategory.subcontent_name}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SubCategory;
