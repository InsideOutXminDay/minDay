import React, { useEffect, useState } from 'react';
import Category from '../components/Contents/Category';
import SubCategory from '../components/Contents/SubCategory';
import ContentsView from '../components/Contents/ContentsView';
import '../styles/Contents/Contents.css';
import Header from '../components/Header';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const Contents = ({ token, logout }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const location = useLocation();
  const { userId } = location.state || {};
  const [contents, setContents] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/contents', {
        headers: { authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setContents(res.data);
      })
      .catch((error) => console.error('Error:', error));
  }, []);
  console.log(contents);

  return (
    <div style={{ display: 'flex' }}>
      <Header userId={userId} logout={logout} />

      <div className="contents">
        {!selectedCategory && (
          <Category
            categories={contents.filter((sub) => sub.subcontent_id === 1)}
            onSelectCategory={setSelectedCategory}
          />
        )}
        {selectedCategory && !selectedSubCategory && (
          <SubCategory
            category={selectedCategory}
            subCategories={contents.filter(
              (sub) => sub.content_id === selectedCategory.content_id
            )}
            onBack={() => setSelectedCategory(null)}
            onSelectSubCategory={setSelectedSubCategory}
          />
        )}
        {selectedSubCategory && (
          <ContentsView
            subCategory={selectedSubCategory}
            onBack={() => setSelectedSubCategory(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Contents;
