import { Link } from 'react-router-dom';

function DataDetailProduct({ product }) {
    return (
        <div className="max-w-[1200px] h-auto mx-auto bg-white mt-6 p-6 rounded-sm ">
            <h1 className="capitalize bg-gray-50 h-14 flex items-center px-4 rounded-sm md:text-xl">
                Chi tiết sản phẩm
            </h1>
            {/* Đường dẫn category  */}
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Danh mục
                </div>
                <div className='text-sm md:text-base flex gap-2 text-black tracking-widest items-center overflow-hidden'>
                    <Link to="/" className='text-sm font-normal text-blue-600' >Shopee</Link> 
                    <i className="fa-solid fa-chevron-right text-[10px] translate-y-[2px] text-[#696969]"></i>
                    <Link to={`/category/${product.category}`} className='text-sm font-normal text-blue-600'>{product.category}</Link>
                </div>
            </div>
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Số sản phẩm còn lại
                </div>
                <div className="text-sm md:text-base">
                    {product.stockCounts.reduce((prevSum, item) => prevSum + parseInt(item.count), 0)}
                </div>
            </div>
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Cửa hàng
                </div>
                <div className="text-sm md:text-base">
                    {product.fromStore}
                </div>
            </div>
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Nguyên liệu
                </div>
                <div className="text-sm md:text-base">
                    {product.detailedProduct.material}
                </div>
            </div>
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Gửi từ
                </div>
                <div className="text-sm md:text-base">
                    {product.detailedProduct.shipFrom}
                </div>
            </div>
            <div className="w-full h-14 grid grid-cols-[160px_1fr] md:grid-cols-[200px_1fr] flex items-center">
                <div className="text-sm text-grayTextColor font-normal px-4">
                    Xuất xứ
                </div>
                <div className="text-sm md:text-base">
                    {product.detailedProduct.origin}
                </div>
            </div>
            <h1 className="capitalize bg-gray-50 h-14 flex items-center px-4 rounded-sm md:text-xl">
                Mô tả sản phẩm
            </h1>
            <div className="text-base mt-4 font-normal px-4">
                {product.detailedProduct.description}
            </div>
        </div>
    );
}
export default DataDetailProduct;