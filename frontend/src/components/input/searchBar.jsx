import clsx from 'clsx';
import '../../css/header.css';
import { useSuggestProductNamesQuery } from '../../features/api/productQuery';
import { useState, useEffect, useRef } from 'react';

export default function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const { data } = useSuggestProductNamesQuery(
    { keyword: debouncedKeyword, limit: 10 },
    {
      skip: debouncedKeyword.trim().length === 0,
    }
  );

  return (
    <div className="navbar_input-wrapper flex items-center mt-4 w-full h-[40px] bg-white pl-[10px]">
      <input
        ref={inputRef}
        type="text"
        className="navbar_input text-sm w-full h-10 flex-1"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Shopee bao ship 0Đ - Đăng kí ngay!"
      />
      <button
        onClick={() => inputRef.current?.focus()}
        className="w-[60px] h-[calc(100%-6px)] bg-primaryColor flex items-center justify-center m-[3px] rounded-sm"
      >
        <i className="fa-solid fa-magnifying-glass text-white"></i>
      </button>
      <div
        className={clsx(
          'absolute top-[calc(100%+10px)] left-[calc(0px-1px)] w-[calc(100%-60px)] flex flex-col items-start justify-start',
          'bg-white rounded-sm shadow-md',
          debouncedKeyword.trim().length === 0 && 'hidden',
          keyword.trim().length === 0 && 'hidden'
        )}
      >
        {data?.map((item, idx) => (
          <div
            key={idx}
            className={clsx(
              'w-full px-3 py-2 hover:bg-backgroundGrayColor',
              'truncate cursor-pointer text-sm hover:text-primaryTextColor'
            )}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
