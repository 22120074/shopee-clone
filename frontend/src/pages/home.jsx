import './home.css';
import React, { useState } from 'react';

function Home() {

  const images = [
    'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma42dqk0bqdea9_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7rauh-ma3rzh4149sya6_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7ravs-ma3rzixif1i11f_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7raur-ma2hf4bqc4nl49_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7rauh-ma2hlp0duz6xb6_xxhdpi',
    // ... thêm bao nhiêu tuỳ bạn
  ];

  const [currentIndex, setCurrentIndex] = useState(1);
  const length = images.length;

  // Chuyển sang ảnh trước
  const goPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? length - 1 : prevIndex - 1
    );
  };

  // Chuyển sang ảnh kế tiếp
  const goNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === length - 1 ? 0 : prevIndex + 1
    );
  };



  return (
    <div className="home_wrapper">

      <div className="home-events-banner"> 
        <div className='home-events-banner_ads'>
          <div 
            className="home-events-banner_ads-content_1"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
            aria-label={`Ảnh số ${currentIndex + 1}`}
            >
            
            <button onClick={goPrev} className="banner_ads-content-button left">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button onClick={goNext} className="banner_ads-content-button right">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
          <div>
            <div></div>
            <div></div>
          </div>
        </div>

        <div className='home-events-banner_list'>

        </div>

      </div>

    </div>
  );
}
export default Home;