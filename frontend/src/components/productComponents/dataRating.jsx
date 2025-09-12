
function DataRatingProduct({ product, rating, numReviews }) {
    return (
        <div className="max-w-[1200px] h-auto mx-auto bg-white mt-6 p-6 rounded-sm ">
            <h1 className="capitalize bg-gray-50 h-14 flex items-center px-4 rounded-sm text-xl">
                Đánh giá sản phẩm
            </h1>
            <div className="w-full h-14 flex px-6">
                <div className='relative flex gap-[2px] justify-start items-center text-[18px]'>
                    <div className='mr-1 underline underline-offset-[3px] decoration-1'>
                        {rating}
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <i
                            key={i}
                            className={`text-[12px] ${
                                rating >= i ? 'fa-solid' : 'fa-regular'
                            } fa-star text-[#FFC107]`}
                        ></i>
                    ))}
                    {/* Thẻ div để hiện thanh dọc ngăn cách */}
                    <span
                        style={{
                        content: '""',
                        top: 'calc(50% - 12px)',
                        right: 'calc(0px)',
                        height: '24px',
                        border: '1px solid #E8E8E8',
                        margin: '0 16px',
                        }}
                    ></span>
                </div>
            </div>
            <div className="text-base mt-4 font-normal px-4">
                {product.detailedProduct.rating}
            </div>
        </div>
    );
}
export default DataRatingProduct;
