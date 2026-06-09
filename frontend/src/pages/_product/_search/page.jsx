import clsx from 'clsx';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSearchProductsByNameQuery } from '../../../features/api/productQuery';
import ProductList from '../../../components/productComponents/productList';
import useIsWindow from '../../../hooks/useIsWindow';
import Pagination from '../../../components/Pagination';
import Stack from '../../../components/layout/stack';
import Sidebar from '../../../components/productComponents/sidebar';

export default function SearchResultPage() {
  const isPhone = useIsWindow('(max-width: 768px)');
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [isSearchingNewKeyword, setIsSearchingNewKeyword] = useState(false);

  const closeSidebar = () => {
    // No-op on desktop; can be extended for mobile drawer behavior
  };

  const { data, isLoading, isFetching } = useSearchProductsByNameQuery(
    { keyword: keyword, page: page, limit: 20 },
    {
      skip: !keyword || keyword.trim().length === 0,
    }
  );

  const totalPages = data?.totalPages || 0;

  useEffect(() => {
    setIsSearchingNewKeyword(true);
    setPage(1);
  }, [keyword]);

  useEffect(() => {
    if (!isFetching) {
      setIsSearchingNewKeyword(false);
    }
  }, [isFetching]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [page]);

  return (
    <div
      className={clsx(
        'w-full max-w-[1200px] relative mx-auto',
        'grid grid-cols-1 md:grid-cols-[2fr_10fr] pt-4'
      )}
    >
      <Sidebar
        filters={filters}
        setFilters={setFilters}
        closeSidebar={closeSidebar}
      />
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="start"
        className="gap-8"
      >
        <ProductList
          productsData={data?.rows}
          isLoading={isLoading || isFetching}
          gridCols={'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5'}
        />
        {!isLoading && !isSearchingNewKeyword && totalPages > 1 && (
          <Pagination
            currentPage={page - 1}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p + 1)}
            isPhone={isPhone}
          />
        )}
      </Stack>
    </div>
  );
}
