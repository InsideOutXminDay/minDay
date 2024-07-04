import React from 'react';
import '../styles/SubCategory.css';

const SubCategory = ({ category, subCategories, onBack, onSelectSubCategory }) => {
  return (
    <div className="sub-category-grid">
      <button onClick={onBack} className="back-button">🔙</button>
      <h2>{category.name}</h2>
      {subCategories.map((subCategory) => (
        <div key={subCategory.id} className="sub-category-item" onClick={() => onSelectSubCategory(subCategory)}>
          <img src={subCategory.image} alt={subCategory.name} className="sub-category-image" />
          <div className="sub-category-name">{subCategory.name}</div>
        </div>
      ))}
    </div>
  );
};

export default SubCategory;
