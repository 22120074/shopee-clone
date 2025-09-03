import '../css/home.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import CarouselSlider from '../components/CarouselSlide';
import TrendingProducts from './TrendingProducts';

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

  // Danh mục sản phẩm
  const categories = [
    { name: 'Thời Trang Nam', image: 'https://down-vn.img.susercontent.com/file/687f3967b7c2fe6a134a2c11894eea4b@resize_w640_nl.webp' },
    { name: 'Điện Thoại & Phụ Kiện', image: 'https://down-vn.img.susercontent.com/file/31234a27876fb89cd522d7e3db1ba5ca@resize_w640_nl.webp' },
    { name: 'Thiết Bị Điện Tử', image: 'https://down-vn.img.susercontent.com/file/978b9e4cb61c611aaaf58664fae133c5@resize_w640_nl.webp'},
    { name: 'Máy Tính & Laptop', image: 'https://down-vn.img.susercontent.com/file/c3f3edfaa9f6dafc4825b77d8449999d@resize_w640_nl.webp'},
    { name: 'Máy Ảnh & Máy Quay Phim', image: 'https://down-vn.img.susercontent.com/file/ec14dd4fc238e676e43be2a911414d4d@resize_w640_nl.webp'},
    { name: 'Đồng Hồ', image: 'https://down-vn.img.susercontent.com/file/86c294aae72ca1db5f541790f7796260@resize_w640_nl.webp'},
    { name: 'Giày Dép Nam', image: 'https://down-vn.img.susercontent.com/file/74ca517e1fa74dc4d974e5d03c3139de@resize_w640_nl.webp'},
    { name: 'Thiết Bị Điện Gia Dụng', image: 'https://down-vn.img.susercontent.com/file/7abfbfee3c4844652b4a8245e473d857@resize_w640_nl.webp'},
    { name: 'Thể Thao & Du Lịch', image: 'https://down-vn.img.susercontent.com/file/6cb7e633f8b63757463b676bd19a50e4@resize_w640_nl.webp'},
    { name: 'Ô Tô & Xe Máy & Xe Đạp', image: 'https://down-vn.img.susercontent.com/file/3fb459e3449905545701b418e8220334@resize_w640_nl.webp'},
    { name: 'Balo & Túi Ví Nam', image: 'https://down-vn.img.susercontent.com/file/18fd9d878ad946db2f1bf4e33760c86f@resize_w640_nl.webp'},
    { name: 'Đồ Chơi', image: 'https://down-vn.img.susercontent.com/file/ce8f8abc726cafff671d0e5311caa684@resize_w640_nl.webp'},
    { name: 'Chăm Sóc Thú Cưng', image: 'https://down-vn.img.susercontent.com/file/cdf21b1bf4bfff257efe29054ecea1ec@resize_w640_nl.webp'},
    { name: 'Dụng Cụ Và Thiết Bị Tiện Ích', image: 'https://down-vn.img.susercontent.com/file/e4fbccba5e1189d1141b9d6188af79c0@resize_w640_nl.webp'},
    { name: 'Thời Trang Nữ', image: 'https://down-vn.img.susercontent.com/file/75ea42f9eca124e9cb3cde744c060e4d@resize_w640_nl.webp'},
    { name: 'Mẹ & Bé', image: 'https://down-vn.img.susercontent.com/file/099edde1ab31df35bc255912bab54a5e@resize_w640_nl.webp'},
    { name: 'Nhà Cửa & Đời Sống', image: 'https://down-vn.img.susercontent.com/file/24b194a695ea59d384768b7b471d563f@resize_w640_nl.webp'},
    { name: 'Sắc Đẹp', image: 'https://down-vn.img.susercontent.com/file/ef1f336ecc6f97b790d5aae9916dcb72@resize_w640_nl.webp'},
    { name: 'Sức Khỏe', image: 'https://down-vn.img.susercontent.com/file/49119e891a44fa135f5f6f5fd4cfc747@resize_w640_nl.webp'},
    { name: 'Giày Dép Nữ', image: 'https://down-vn.img.susercontent.com/file/48630b7c76a7b62bc070c9e227097847@resize_w640_nl.webp'},
    { name: 'Túi Ví Nữ', image: 'https://down-vn.img.susercontent.com/file/fa6ada2555e8e51f369718bbc92ccc52@resize_w640_nl.webp'},
    { name: 'Phụ Kiện & Trang Sức Nữ', image: 'https://down-vn.img.susercontent.com/file/8e71245b9659ea72c1b4e737be5cf42e@resize_w640_nl.webp'},
    { name: 'Bách Hóa Online', image: 'https://down-vn.img.susercontent.com/file/c432168ee788f903f1ea024487f2c889@resize_w640_nl.webp'},
    { name: 'Nhà Sách Online', image: 'https://down-vn.img.susercontent.com/file/36013311815c55d303b0e6c62d6a8139@resize_w640_nl.webp'},
    { name: 'Thời Trang Trẻ Em', image: 'https://down-vn.img.susercontent.com/file/4540f87aa3cbe99db739f9e8dd2cdaf0@resize_w640_nl.webp'},
    { name: 'Giặt Giũ & Chăm Sóc Nhà Cửa', image: 'https://down-vn.img.susercontent.com/file/cd8e0d2e6c14c4904058ae20821d0763@resize_w640_nl.webp'},
    { name: 'Voucher & Dịch Vụ', image: 'https://down-vn.img.susercontent.com/file/b0f78c3136d2d78d49af71dd1c3f38c1@resize_w640_nl.webp'}
 ];
  const [categoriesIndex, setCurrentIndexCate] = useState(0);
  // Chuyển sang phía sau
  const goPrevCate = () =>
    setCurrentIndexCate(i => (i === 0 ? slideCountCate - 1 : i - 1));
  // Chuyển sang phía trước
  const goNextCate = () =>
    setCurrentIndexCate(i => (i === slideCountCate - 1 ? 0 : i + 1));
  const itemsPerSlideCate = 10;                                           // Số lượng mục hiển thị trên mỗi slide
  const itemsPerLineCate = Math.ceil(categories.length / 2);              // Số lượng mục hiển thị trên mỗi dòng, đã bị che
  const slideCountCate = Math.ceil(categories.length / itemsPerLineCate); // Tổng số slide cần thiết

  return (
    <div className="home_wrapper flex flex-col items-center bg-[#F5F5F5] w-full">
      {/* Phần hiển thị ảnh quảng cáo và danh mục ở đầu trang home */}
      <div className="home-events-banner flex flex-col items-center w-full h-auto bg-white"> 
        {/* Phần hiển thị danh sách ảnh quảng cáo */}
        <div className='home-events-banner_ads flex h-[240px] mx-auto w-full max-w-[1200px]'>
          {/* Hiển thị ảnh quảng cáo 1 dạng Slide*/}
          <div className='w-[800px] h-[240px] rounded-[3px] overflow-hidden'>
            <CarouselSlider images={images} width={800} height={240} />
          </div>
          {/* Hiển thị ảnh quảng cáo 2 và 3 */}
          <div className='home-events-banner_ads-wrapper_2 flex flex-col'>
            <div
              className="w-full h-[116px] bg-cover bg-left-center bg-no-repeat rounded-[3px]"
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/sg-11134258-7rat8-ma85park5zj5bf_xhdpi)` }}
              aria-label={`Ảnh quảng cáo`}
              >
              <Link to='/' className='block w-full h-full'></Link>
            </div>
            <div 
              className="w-full h-[116px] bg-cover bg-left-center bg-no-repeat rounded-[3px]"
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/sg-11134258-7ratv-ma85pekcg70lbb_xhdpi)` }}
              aria-label={`Ảnh quảng cáo`}
              >
              <Link to='/' className='block w-full h-full'></Link>
            </div>
          </div>
        </div>
        {/* Phần hiển thị danh mục quảng cáo */}
        <div className='home-events-banner_list flex flex-row items-start w-full max-w-[1200px]'>
          <Link to='/' className='flex flex-col items-center flex-1 hover:-translate-y-[2px] transition-transform duration-100 ease-out'>
            <div className='h-[44px] w-[44px]' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-8a387d78a7ad954ec489d3ef9abd60b4_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text text-[14px] text-black text-center w-[85px]'>Mã Giảm Giá</h3>
          </Link>
          <Link to='/' className='flex flex-col items-center flex-1 hover:-translate-y-[2px] transition-transform duration-100 ease-out'>
            <div className='h-[44px] w-[44px]' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-f692e9b0be05d1a11cded7f9f72b5f0b_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text text-[14px] text-black text-center w-[85px]'>Khách Hàng Thân Thiết</h3>
          </Link>
          <Link to='/' className='flex flex-col items-center flex-1 hover:-translate-y-[2px] transition-transform duration-100 ease-out'>
            <div className='h-[44px] w-[44px]' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-5bf65d4dc0eb8f6b42074751e8b736a7_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text text-[14px] text-black text-center w-[85px]'>Hàng Chọn Giá Hời</h3>
          </Link>

          <Link to='/' className='flex flex-col items-center flex-1 hover:-translate-y-[2px] transition-transform duration-100 ease-out'>
            <div className='h-[44px] w-[44px]' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/vn-50009109-c02353c969d19918c53deaa4ea15bdbe_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text text-[14px] text-black text-center w-[85px]'>Shopee Style Voucher 30%</h3>
          </Link>
          <Link to='/' className='flex flex-col items-center flex-1 hover:-translate-y-[2px] transition-transform duration-100 ease-out'>
            <div className='h-[44px] w-[44px]' 
              style={{ backgroundImage: `url(https://cf.shopee.vn/file/1d25d74d6900b85cfde8f967e613041d_xhdpi)`,
              backgroundSize: 'contain', 
              backgroundRepeat: 'no-repeat' }}
            />
            <h3 className='home-events-banner_list-text text-[14px] text-black text-center w-[85px]'>Săn Ngay 100.000 Xu</h3>
          </Link>
        </div>
      </div>
      {/* Danh mục sản phẩm */}
      <div className='home-category flex flex-col items-center justify-center bg-white w-full max-w-[1200px] relative'>
        <h2 className='home-category-title flex items-center justify-start h-16 w-full text-[16px] text-[#757575] uppercase'>
          Danh mục sản phẩm
        </h2>
        {/* Phần Slide chứa danh mục các sản phẩm */}
        <div className="relative mx-auto w-full max-w-[1200px] overflow-hidden">
          <ul
            className="h-full flex flex-row self-start flex-wrap transition-transform duration-500 ease"
            style={{
              width: `${itemsPerLineCate * 120}px`, // ví dụ: 10% của 1200px
              transform: `translateX(-${categoriesIndex * (itemsPerLineCate - itemsPerSlideCate) * 120}px)`,
            }}
          >
            {categories.map((cat, index) => (
              <li key={index} className="w-[120px] h-[150px]">
                <Link to={`/category/${cat.name}`} className="home-category_list-item w-full h-full flex flex-col items-center border border-[#F2F2F2]">
                  <div
                    className="w-[84px] h-[84px] bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${cat.image})` }}
                  ></div>
                  <h3 className='text-[14px] text-black text-center'>{cat.name}</h3>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        {/* Phần chuển trang */}
        { categoriesIndex > 0 && 
          <button className="cate_button round_button left" onClick={goPrevCate}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>
        }
        { categoriesIndex === 0 && 
          <button className="cate_button round_button right" onClick={goNextCate}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        }
      </div>
      <TrendingProducts />

    </div>
  );
}
export default Home;