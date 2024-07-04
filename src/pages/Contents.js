import React, { useState } from 'react';
import Category from '../components/Category';
import SubCategory from '../components/SubCategory';
import ContentsView from '../components/ContentsView';
import '../styles/Contents.css';

const categories = [
  { id: 1, name: '편안한 수면', image: 'img/contents_sleep.jpg' },
  { id: 2, name: '자연과 함께하는 휴식', image: 'img/contents_nature.jpg' },
  { id: 3, name: '명상을 통한 심신 안정', image: 'images/meditation.jpg' },
  { id: 4, name: '긍정 에너지 만들기', image: 'images/positive.jpg' },
  { id: 5, name: '스트레스 극복하기', image: 'images/stress.jpg' },
  { id: 6, name: '우울감 극복하기', image: 'images/exercise.jpg' },
  // 필요에 따라 더 추가
];

const subCategories = [
  { id: 1, categoryId: 1, name: '수면 유도 음악', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 1, name: '잠자기 전 들려주는 이야기', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 1, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  // 필요에 따라 더 추가
];

const Contents = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  return (
    <div className="contents">
      {!selectedCategory && (
        <Category categories={categories} onSelectCategory={setSelectedCategory} />
      )}
      {selectedCategory && !selectedSubCategory && (
        <SubCategory
          category={selectedCategory}
          subCategories={subCategories.filter(sub => sub.categoryId === selectedCategory.id)}
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
  );
};

export default Contents;
