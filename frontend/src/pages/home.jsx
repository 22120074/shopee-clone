import './home.css';
// import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CarouselSlider from '../components/CarouselSlide';

function Home() {

  // Danh sách ảnh quảng cáo đầu trang home
  const images = [
    'https://cf.shopee.vn/file/vn-11134258-7ra0g-ma42dqk0bqdea9_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7rauh-ma3rzh4149sya6_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7ravs-ma3rzixif1i11f_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7raur-ma2hf4bqc4nl49_xxhdpi',
    'https://cf.shopee.vn/file/sg-11134258-7rauh-ma2hlp0duz6xb6_xxhdpi',
    // ... thêm bao nhiêu tuỳ bạn
  ];

  return (
    <div className="home_wrapper">
      {/* Phần hiển thị ảnh quảng cáo và danh mục ở đầu trang home */}
      <div className="home-events-banner"> 
        {/* Phần hiển thị danh sách ảnh quảng cáo */}
        <div className='home-events-banner_ads'>
          {/* Hiển thị ảnh quảng cáo 1*/}
          <CarouselSlider images={images} width={800} height={240} />
          {/* Hiển thị ảnh quảng cáo 2 và 3 */}
          <div className='home-events-banner_ads-wrapper_2'>
            <div
              className="home-events-banner_ads-content_2"
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/sg-11134258-7rat8-ma85park5zj5bf_xhdpi)` }}
              aria-label={`Ảnh quảng cáo`}
              >
              <Link to='/' className='block w-full h-full'></Link>
            </div>
            <div 
              className="home-events-banner_ads-content_2"
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/sg-11134258-7ratv-ma85pekcg70lbb_xhdpi)` }}
              aria-label={`Ảnh quảng cáo`}
              >
              <Link to='/' className='block w-full h-full'></Link>
            </div>
          </div>
        </div>
        {/* Phần hiển thị danh mục quảng cáo */}
        <div className='home-events-banner_list'>
        
        </div>

      </div>

    </div>
  );
}
export default Home;