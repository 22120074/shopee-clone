import clsx from 'clsx';
import '../../css/header.css';
import { useSuggestProductNamesQuery } from '../../features/api/productQuery';
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';

export default function SearchBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (location.pathname.includes('/search')) {
      const urlKeyword = searchParams.get('keyword');
      if (urlKeyword) {
        setKeyword(urlKeyword);
      }
    } else {
      setKeyword('');
    }
  }, [location.pathname, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 200);

    return () => clearTimeout(timer);
  }, [keyword]);

  const { data } = useSuggestProductNamesQuery(
    { keyword: debouncedKeyword, limit: 10 },
    {
      skip: debouncedKeyword.trim().length === 0 || !isFocused,
    }
  );

  const submitSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;
    setIsFocused(false);
    inputRef.current?.blur();

    navigate(`/search?keyword=${searchTerm}`);
  };

  const handleSelectKeyword = (selectedItem) => {
    setKeyword(selectedItem);
    submitSearch(selectedItem);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submitSearch(keyword);
    }
  };

  return (
    <div className="navbar_input-wrapper relative flex items-center mt-4 w-full h-[40px] bg-white pl-[10px]">
      <input
        ref={inputRef}
        type="text"
        className="navbar_input text-sm w-full h-10 flex-1"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          setTimeout(() => setIsFocused(false), 100);
        }}
        onKeyDown={handleKeyDown}
        placeholder="Shopee bao ship 0Đ - Đăng kí ngay!"
      />
      <button
        onClick={() => submitSearch(keyword)}
        className="w-[60px] h-[calc(100%-6px)] bg-primaryColor flex items-center justify-center m-[3px] rounded-sm"
      >
        <i className="fa-solid fa-magnifying-glass text-white"></i>
      </button>

      {/* Danh sách gợi ý */}
      <div
        className={clsx(
          'absolute top-[calc(100%+10px)] left-[calc(0px-1px)] w-[calc(100%-60px)] flex flex-col items-start justify-start',
          'bg-white rounded-sm shadow-md z-10',
          (!isFocused || !data || data.length === 0) && 'hidden'
        )}
      >
        {data?.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'w-full px-3 py-2 hover:bg-backgroundGrayColor',
              'truncate cursor-pointer text-sm hover:text-primaryTextColor'
            )}
            onMouseDown={() => handleSelectKeyword(item)}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
