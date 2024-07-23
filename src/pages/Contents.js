import React, { useState } from 'react';
import Category from '../components/Contents/Category';
import SubCategory from '../components/Contents/SubCategory';
import ContentsView from '../components/Contents/ContentsView';
import '../styles/Contents/Contents.css';
import Header from '../components/Header';

const categories = [
  { id: 1, name: '편안한 수면', image: 'img/contents_img/contents_sleep.jpg' },
  {
    id: 2,
    name: '자연과 함께하는 휴식',
    image: 'img/contents_img/contents_nature.jpg',
  },
  {
    id: 3,
    name: '명상을 통한 심신 안정',
    image: 'img/contents_img/contents_yoga.jpg',
  },
  {
    id: 4,
    name: '불안감 다스리기',
    image: 'img/contents_img/contents_nervous.jpg',
  },
  {
    id: 5,
    name: '스트레스 극복하기',
    image: 'img/contents_img/contents_stress.jpg',
  },
  {
    id: 6,
    name: '우울감 극복하기',
    image: 'img/contents_img/contents_sadness.jpg',
  },
];

const subCategories = [
  {
    id: 1,
    categoryId: 1,
    name: '수면 유도 음악',
    image: 'img/contents_img/subcontents/sleep1_image.jpg',
    video: 'https://www.youtube.com/watch?v=aBSjhKevAio',
  },
  {
    id: 2,
    categoryId: 1,
    name: '백색 소음',
    image: 'img/contents_img/subcontents/sleep2_image.jpg',
    video: 'https://www.youtube.com/watch?v=xRuHxlUoy2s',
  },
  {
    id: 3,
    categoryId: 1,
    name: '델타파 수면',
    image: 'img/contents_img/subcontents/sleep3_image.jpg',
    video:
      'https://www.youtube.com/watch?v=zoHBoEL_L1o&list=PLMk37ZqEMw-a01Q3CIDuNlRhXyStCGUUl',
  },
  {
    id: 4,
    categoryId: 1,
    name: '깊은 수면을 위한 생각 비우기',
    image: 'img/contents_img/subcontents/sleep4_image.jpg',
    video: 'https://www.youtube.com/watch?v=X901on9pDEo',
  },

  {
    id: 1,
    categoryId: 2,
    name: '소복소복 빗소리',
    image: 'img/contents_img/subcontents/nature1_image.jpg',
    video: 'https://www.youtube.com/watch?v=lQ0fS2meTYQ',
  },
  {
    id: 2,
    categoryId: 2,
    name: '숲 사운드 테라피',
    image: 'img/contents_img/subcontents/nature2_image.jpg',
    video: 'https://www.youtube.com/watch?v=xNN7iTA57jM',
  },
  {
    id: 3,
    categoryId: 2,
    name: '시원한 바다',
    image: 'img/contents_img/subcontents/nature3_image.jpg',
    video: 'https://www.youtube.com/watch?v=Nep1qytq9JM',
  },
  {
    id: 4,
    categoryId: 2,
    name: '노르웨이 모닥불',
    image: 'img/contents_img/subcontents/nature4_image.jpg',
    video: 'https://www.youtube.com/watch?v=UgHKb_7884o',
  },

  {
    id: 1,
    categoryId: 3,
    name: '5분 아침 명상',
    image: 'img/contents_img/subcontents/med1_image.jpg',
    video: 'https://www.youtube.com/watch?v=quQoNETX3s8',
  },
  {
    id: 2,
    categoryId: 3,
    name: '만성피로 완화를 위한 명상',
    image: 'img/contents_img/subcontents/med2_image.jpg',
    video: 'https://www.youtube.com/watch?v=mWASFFB8YFY',
  },
  {
    id: 3,
    categoryId: 3,
    name: '마음 챙기기',
    image: 'img/contents_img/subcontents/med3_image.jpg',
    video: 'https://www.youtube.com/watch?v=ceEYXS2a5sg',
  },
  {
    id: 4,
    categoryId: 3,
    name: '나를 위한 마음 비우기',
    image: 'img/contents_img/subcontents/med4_image.jpg',
    video: 'https://www.youtube.com/watch?v=z0GtmPnqAd8',
  },

  {
    id: 1,
    categoryId: 4,
    name: '내일의 고민 잊어버리기',
    image: 'img/contents_img/subcontents/nerv1_image.jpg',
    video: 'https://www.youtube.com/watch?v=OKqqnitWsz0',
  },
  {
    id: 2,
    categoryId: 4,
    name: '불안감을 자신감으로',
    image: 'img/contents_img/subcontents/nerv2_image.jpg',
    video: 'https://www.youtube.com/watch?v=cBO6XWLUgR0',
  },
  {
    id: 3,
    categoryId: 4,
    name: '마음 진정시키기',
    image: 'img/contents_img/subcontents/nerv3_image.jpg',
    video: 'https://www.youtube.com/watch?v=ZQWrleq-NhQ',
  },
  {
    id: 4,
    categoryId: 4,
    name: '인지 행동 치료법',
    image: 'img/contents_img/subcontents/nerv4_image.jpg',
    video: 'https://www.youtube.com/watch?v=zAIZpNbYytI',
  },

  {
    id: 1,
    categoryId: 5,
    name: '스트레스 해소하기',
    image: 'img/contents_img/subcontents/stress1_image.jpg',
    video: 'https://www.youtube.com/watch?v=5bmDMFqnTs0',
  },
  {
    id: 2,
    categoryId: 5,
    name: '압박감 떨쳐내기',
    image: 'img/contents_img/subcontents/stress2_image.jpg',
    video: 'https://www.youtube.com/watch?v=a89vNiNQRvA',
  },
  {
    id: 3,
    categoryId: 5,
    name: '스트레스 힐링하기',
    image: 'img/contents_img/subcontents/stress3_image.jpg',
    video: 'https://www.youtube.com/watch?v=lFcSrYw-ARY',
  },
  {
    id: 4,
    categoryId: 5,
    name: '스트레스를 긍정의 힘으로',
    image: 'img/contents_img/subcontents/stress4_image.jpg',
    video: 'https://www.youtube.com/watch?v=Hp_Eg8NMfT0',
  },

  {
    id: 1,
    categoryId: 6,
    name: '활력있는 생활',
    image: 'img/contents_img/subcontents/sad1_image.jpg',
    video:
      'https://www.youtube.com/watch?v=VbT2wQq5jQY&pp=ygUQcG9zaXRpdmUgaGVhbGluZw%3D%3D',
  },
  {
    id: 2,
    categoryId: 6,
    name: '부정적인 감정 해소하기',
    image: 'img/contents_img/subcontents/sad2_image.jpg',
    video: 'https://www.youtube.com/watch?v=gl3T3zW7gF8',
  },
  {
    id: 3,
    categoryId: 6,
    name: '응원의 한 마디',
    image: 'img/contents_img/subcontents/sad3_image.jpg',
    video: 'https://www.youtube.com/watch?v=gl3T3zW7gF8',
  },
  {
    id: 4,
    categoryId: 6,
    name: '나를 채찍질하지 않기',
    image: 'img/contents_img/subcontents/sad4_image.jpg',
    video: 'https://www.youtube.com/watch?v=I3OJUwILelU',
  },
];

const Contents = ({ logout }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  return (
    <div style={{ display: 'flex' }}>
      <Header logout={logout} />

      <div className="contents">
        {!selectedCategory && (
          <Category
            categories={categories}
            onSelectCategory={setSelectedCategory}
          />
        )}
        {selectedCategory && !selectedSubCategory && (
          <SubCategory
            category={selectedCategory}
            subCategories={subCategories.filter(
              (sub) => sub.categoryId === selectedCategory.id
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
