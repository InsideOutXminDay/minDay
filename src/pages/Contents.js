import React, { useState } from 'react';
import Category from '../components/Category';
import SubCategory from '../components/SubCategory';
import ContentsView from '../components/ContentsView';
import '../styles/Contents.css';

const categories = [
  { id: 1, name: '편안한 수면', image: 'img/contents_img/contents_sleep.jpg' },
  { id: 2, name: '자연과 함께하는 휴식', image: 'img/contents_img/contents_nature.jpg' },
  { id: 3, name: '명상을 통한 심신 안정', image: 'img/contents_img/contents_yoga.jpg' },
  { id: 4, name: '불안감 다스리기', image: 'img/contents_img/contents_nervous.jpg' },
  { id: 5, name: '스트레스 극복하기', image: 'img/contents_img/contents_stress.jpg' },
  { id: 6, name: '우울감 극복하기', image: 'img/contents_img/contents_sadness.jpg' },
];

const subCategories = [
  { id: 1, categoryId: 1, name: '수면 유도 음악', image: 'images/sleep_music.jpg', video: 'img/contents_img/sleep1_video.mp4' },
  { id: 2, categoryId: 1, name: '굿나잇 스토리', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 1, name: '델타파 수면', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 1, name: '깊은 수면을 위한 생각 비우기', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },

  { id: 1, categoryId: 2, name: '소복소복 빗소리', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 2, name: '숲 사운드 테라피', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 2, name: '시원한 바다', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 2, name: '노르웨이 모닥불', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },

  { id: 1, categoryId: 3, name: '5분 아침 명상', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 3, name: '만성피로 완화를 위한 명상', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 3, name: '마음 챙기기', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 3, name: '나를 위한 마음 비우기', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },

  { id: 1, categoryId: 4, name: '수면 유도 음악', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 4, name: '잠자기 전 들려주는 이야기', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 4, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 4, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },

  { id: 1, categoryId: 5, name: '수면 유도 음악', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 5, name: '잠자기 전 들려주는 이야기', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 5, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 5, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },

  { id: 1, categoryId: 6, name: '수면 유도 음악', image: 'images/sleep_music.jpg', video: 'videos/sleep_music.mp4' },
  { id: 2, categoryId: 6, name: '잠자기 전 들려주는 이야기', image: 'images/bedtime_story.jpg', video: 'videos/bedtime_story.mp4' },
  { id: 3, categoryId: 6, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  { id: 4, categoryId: 6, name: '편안한 명상', image: 'images/meditation.jpg', video: 'videos/meditation.mp4' },
  
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
