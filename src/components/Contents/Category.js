import React from 'react';
import '../../styles/Contents/Category.css';

const Category = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div key={category.maincontent_id} className="category-item" onClick={() => onSelectCategory(category)}>
          <img src={category.content_image} alt={category.content_name} className="category-image" />
          <div className="category-name">{category.content_name}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
