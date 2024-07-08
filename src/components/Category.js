import React from 'react';
import '../styles/Category.css';

const Category = ({ categories, onSelectCategory }) => {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <div key={category.id} className="category-item" onClick={() => onSelectCategory(category)}>
          <img src={category.image} alt={category.name} className="category-image" />
          <div className="category-name">{category.name}</div>
        </div>
      ))}
    </div>
  );
};

export default Category;
