import React, { useState } from 'react';
import clsx from 'clsx';

// Danh mục sản phẩm (Rút gọn để dễ nhìn, bạn có thể thay bằng mảng full của bạn)
const categories = [
  'Thời Trang Nam',
  'Điện Thoại & Phụ Kiện',
  'Thiết Bị Điện Tử',
  'Máy Tính & Laptop',
  'Máy Ảnh & Máy Quay Phim',
  'Đồng Hồ',
  'Giày Dép Nam',
  'Thiết Bị Điện Gia Dụng',
  'Thể Thao & Du Lịch',
  'Ô Tô & Xe Máy & Xe Đạp',
  'Thời Trang Nữ',
  'Mẹ & Bé',
];

export default function Sidebar({ filters = {}, setFilters, closeSidebar }) {
  // Local state cho khoảng giá để không gọi API liên tục khi đang gõ
  const [localMinPrice, setLocalMinPrice] = useState(filters.minPrice || '');
  const [localMaxPrice, setLocalMaxPrice] = useState(filters.maxPrice || '');

  // Hàm cập nhật filter chung
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key] === value ? undefined : value, // Bấm lại sẽ bỏ chọn
    }));
  };

  const handleApplyPrice = () => {
    setFilters((prev) => ({
      ...prev,
      minPrice: localMinPrice ? Number(localMinPrice) : undefined,
      maxPrice: localMaxPrice ? Number(localMaxPrice) : undefined,
    }));
  };

  const handleClearAll = () => {
    setFilters({});
    setLocalMinPrice('');
    setLocalMaxPrice('');
  };

  // Component render Ngôi sao
  const StarIcon = ({ filled }) => (
    <svg
      viewBox="0 0 1024 1024"
      className={clsx(
        'w-4 h-4 mr-1',
        filled ? 'text-[#ffce3d] fill-current' : 'text-gray-300 fill-current'
      )}
    >
      <path d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.9 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 754l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.3-27-36.3z" />
    </svg>
  );

  return (
    <div
      className={clsx(
        'w-[240px] bg-white p-4 rounded-lg shadow-sm text-sm text-gray-800'
      )} /*[cite: 5] */
    >
      {/* HEADER */}
      <div
        className={clsx(
          'flex items-center gap-2 font-bold text-base mb-6 uppercase'
        )} /*[cite: 5] */
      >
        <svg viewBox="0 0 12 10" className="w-4 h-4 fill-current">
          <path d="M0 0h12v1H0zM1 3h10v1H1zM3 6h6v1H3zM4 9h4v1H4z" />
        </svg>
        BỘ LỌC TÌM KIẾM
      </div>

      {/* DANH MỤC */}
      <div className="mb-6 border-b pb-6">
        <h3 className="font-medium mb-3">Theo Danh Mục</h3>
        <ul className="space-y-2 max-h-48 overflow-y-auto custom-scrollbar">
          {categories.map((cat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <input
                type="checkbox"
                id={`cat-${idx}`}
                checked={filters.category === cat}
                onChange={() => handleFilterChange('category', cat)}
                className="mt-1 cursor-pointer accent-[#ee4d2d]"
              />
              <label
                htmlFor={`cat-${idx}`}
                className="cursor-pointer hover:text-[#ee4d2d] leading-5"
              >
                {cat}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {/* KHOẢNG GIÁ */}
      <div className="mb-6 border-b pb-6">
        <h3 className="font-medium mb-3">Khoảng Giá</h3>
        <div className="flex items-center gap-2 mb-3">
          <input
            type="number"
            placeholder="Từ"
            value={localMinPrice}
            onChange={(e) => setLocalMinPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:border-gray-400 outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Đến"
            value={localMaxPrice}
            onChange={(e) => setLocalMaxPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-sm px-2 py-1 text-sm focus:border-gray-400 outline-none"
          />
        </div>
        <button
          onClick={handleApplyPrice}
          className="w-full bg-[#ee4d2d] text-white py-1.5 rounded-sm hover:bg-[#d73f22] transition-colors"
        >
          ÁP DỤNG
        </button>
      </div>

      {/* ĐÁNH GIÁ */}
      <div className="mb-6 border-b pb-6">
        <h3 className="font-medium mb-3">Đánh Giá</h3>
        <ul className="space-y-2">
          {[5, 4, 3, 2, 1].map((star) => (
            <li
              key={star}
              onClick={() => handleFilterChange('minRating', star)}
              className={clsx(
                'flex items-center gap-1 cursor-pointer hover:bg-gray-50 p-1 rounded',
                filters.minRating === star ? 'bg-gray-100 font-medium' : ''
              )}
            >
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <StarIcon key={i} filled={i < star} />
                ))}
              </div>
              {star < 5 && <span className="ml-1 text-gray-600">trở lên</span>}
            </li>
          ))}
        </ul>
      </div>

      {/* NÚT XÓA TẤT CẢ */}
      <button
        onClick={handleClearAll}
        className="w-full bg-white border border-[#ee4d2d] text-[#ee4d2d] font-medium py-2 rounded-sm hover:bg-red-50 transition-colors"
      >
        XÓA TẤT CẢ
      </button>
    </div>
  );
}
