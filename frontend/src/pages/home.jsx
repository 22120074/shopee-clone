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
          <Link to='/' className='home-events-banner_list-item'>
            <div className='home-events-banner_list-img' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text'>Mã Giảm Giá</h3>
          </Link>
          <Link to='/' className='home-events-banner_list-item'>
            <div className='home-events-banner_list-img' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-f692e9b0be05d1a11cded7f9f72b5f0b_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text'>Khách Hàng Thân Thiết</h3>
          </Link>
          <Link to='/' className='home-events-banner_list-item'>
            <div className='home-events-banner_list-img' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-5bf65d4dc0eb8f6b42074751e8b736a7_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text'>Hàng Chọn Giá Hời</h3>
          </Link>

          <Link to='/' className='home-events-banner_list-item'>
            <div className='home-events-banner_list-img' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-c02353c969d19918c53deaa4ea15bdbe_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text'>Shopee Style Voucher 30%</h3>
          </Link>
          <Link to='/' className='home-events-banner_list-item'>
            <div className='home-events-banner_list-img' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/1d25d74d6900b85cfde8f967e613041d_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text'>Săn Ngay 100.000 Xu</h3>
          </Link>
        </div>
      </div>
      {/* Danh mục sản phẩm */}
      <div className='home-category'>
        <h2 className='home-category-title'>Danh mục sản phẩm</h2>
        <div></div>
      </div>
    </div>
  );
}
export default Home;