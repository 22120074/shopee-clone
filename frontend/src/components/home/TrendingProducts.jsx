import '../../css/home.css';
import { useGetAllProductsQuery } from '../../features/api/productQuery';
import ProductList from '../productComponents/productList';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

function TrendingProducts() {
  const { data: productsData, isLoading } = useGetAllProductsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  return (
    <div className="w-full max-w-[1200px] relative">
      <div
        className="h-[50px] lg:h-[58px] text-primaryTextColor uppercase text-[18px] font-[400] bg-white 
            flex items-center justify-center border-b-[4px] border-primaryTextColor sticky top-[56px] lg:top-[120px] z-[25]"
      >
        Gợi Ý Hôm Nay
      </div>
      <ProductList productsData={productsData} isLoading={isLoading} />
      <div
        className={clsx(
          'w-full flex items-center justify-center mt-10',
          isLoading ? 'hidden' : ''
        )}
      >
        <Link
          to="/product/TrendingProduct?pageNumber=2"
          className={clsx(
            'w-[380px] h-[40px] bg-[white] border border-[#DFDFDF] flex items-center justify-center',
            'text-[#555] text-center text-[16px] hover:bg-[#E5E5E5] rounded-[3px]'
          )}
        >
          Xem Thêm
        </Link>
      </div>
    </div>
  );
}
export default TrendingProducts;
