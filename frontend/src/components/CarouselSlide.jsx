import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import './CarouselSlide.css';

export default function CarouselSlider({ images, width = 800, height = 240 }) {
  // Tạo chuỗi CSS background-image
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = images.length;

  // Chuyển sang ảnh trước
  const goPrev = () =>
    setCurrentIndex(i => (i === 0 ? length - 1 : i - 1));

  // Chuyển sang ảnh kế tiếp
  const goNext = useCallback(() => {
    setCurrentIndex(i => (i === length - 1 ? 0 : i + 1));
  }, [length]);

  // Tự động chuyển slide mỗi 7 giây
  useEffect(() => {
    const interval = setInterval(() => {
      goNext();
    }, 7000);

    // Clear interval khi unmount hoặc currentIndex thay đổi
    return () => clearInterval(interval);
  }, [currentIndex, length, goNext]);

  return (
    <div className="home-events-banner_ads-content_1"
        style={{ '--n': images.length, width: `${width}px`, height: `${height}px` }}
    >
      {/* Phần hiển thị ảnh quảng cáo */}
      <div
        className="slider-track"
        style={{
          width: `${length * 100}%`,
          transform: `translateX(-${(100 / length) * currentIndex}%)`
        }}
      >
        {images.map((src, idx) => (
          <div
            key={idx}
            className="slider-slide"
            style={{ backgroundImage: `url(${src})` }}
          >
            <Link to={src} className="block w-full h-full" />
          </div>
        ))}
      </div>
      {/* Phần chuển trang */}
      <button className="banner_ads-content-button left" onClick={goPrev}>
        <i className="fa-solid fa-chevron-left"></i>
      </button>
      <button className="banner_ads-content-button right" onClick={goNext}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      {/* Phần hiện index */}
      <div className="slider_dot_wrapper">
        {images.map((_, idx) => (
          <span className='slider_dot'
            key={idx}
            style={{
              backgroundColor: idx === currentIndex ? '#FA5130' : 'rgba(255,255,255,0.5)',
              transition: 'background-color 0.3s'
            }}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </div>
  );
}
