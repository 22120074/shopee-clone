import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneProduct } from '../services/product.service';
// import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import ImagePreview from '../components/ImagePreview';

function ProductLayout() {
    const { productName } = useParams();
    const [product, setProduct] = useState();

    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);

    const prices = product?.attributes?.map(attr => attr.price) || [];
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    const [reducedAttributes, setReducedAttributes] = useState([]);
    const [reducedSizes, setReducedSizes] = useState([]);

    const fetchProducts = async (productName, setProduct) => {
        try {
            const product = await getOneProduct(productName);
            setProduct(product.data);
            console.log('Fetched Products:', product.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Hàm định dạng số lượng đã bán
    const formatSold = (sold) => {
        if (sold >= 1_000_000) return `${(sold / 1_000_000).toFixed(sold % 1_000_000 === 0 ? 0 : 1)}tr`;
        if (sold >= 1_000) return `${(sold / 1_000).toFixed(sold % 1_000 === 0 ? 0 : 1)}k`;
        return sold.toString();
    };

    // Sử dụng useEffect để gọi API khi productName thay đổi
    useEffect(() => {
        if (productName) {
            fetchProducts(productName, setProduct);
        }
    }, [productName]);

    // Sử dụng useEffect để tính rating và số lượng đánh giá
    // Sử dụng useEffect để xử lí data trong product.attribute
    useEffect(() => {
        if (product?.rating?.length > 0) {
            const total = product.rating.reduce((sum, item) => sum + item.rating, 0);
            setRating(total / product.rating.length);
            setNumReviews(product.rating.length);
        } else {
            setRating(0);
            setNumReviews(0);
        }

        if (product?.attributes) {
            const map = new Map();
            const sizeMap = new Map();
            product.attributes.forEach(attr => {
                if (!map.has(attr.nameEach)) {
                    map.set(attr.nameEach, attr);
                }
                if (!sizeMap.has(attr.size)) {
                    sizeMap.set(attr.size, attr);
                }
            });
            setReducedAttributes(Array.from(map.values()));
            setReducedSizes(Array.from(sizeMap.values()));
        }
    }, [product]);

    return (
        <div className="w-full bg-[#F5F5F5] h-[100vh]">
            { product &&
                // Đường dẫn category 
                <div className='max-w-[1200px] mx-auto flex gap-2 h-[56px] text-[13px] text-black tracking-widest items-center overflow-hidden'>
                    <Link to="/" className='text-[12px] font-normal text-blue-600' >Shopee</Link> 
                    <i className="fa-solid fa-chevron-right text-[10px] translate-y-[1px] text-[#696969]"></i>
                    <Link to={`/category/${product.category}`} className='text-[12px] font-normal text-blue-600'>{product.category}</Link>
                    <i className="fa-solid fa-chevron-right text-[10px] translate-y-[1px] text-[#696969]"></i>
                    <div className='text-[13px] font-medium text-[#313131]'>{product.name}</div>
                </div>
            }
            {/* Hiển thị thông tin sản phẩm */}
            { product &&
                <div className='max-w-[1200px] mx-auto p-4 flex bg-white rounded-sm gap-[36px]'>
                    {/* Nữa bên trái chứa hình ảnh, chia sẻ, lượt thích */}
                    <div className=''>
                        {/* Phần xem ảnh, thanh ảnh */}
                        <ImagePreview images={product.image} />
                        {/* Phần chia sẻ và lượt thích */}
                        <div className='flex justify-between items-center mt-6 mb-2'>
                            <div className='relative flex text-[16px] flex-1 item-center justify-center gap-1'>
                                Chia sẻ:
                                <i className="fa-brands fa-facebook-messenger text-[#00B2FF] text-[24px]"></i>
                                <i className="fa-brands fa-facebook text-[#1877F2] text-[24px]"></i>
                                <i className="fa-brands fa-twitter text-[#1DA1F2] text-[24px]"></i>
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 102 102" id="instagram">
                                    <defs>
                                        <radialGradient id="a" cx="6.601" cy="99.766" r="129.502" gradientUnits="userSpaceOnUse">
                                        <stop offset=".09" stop-color="#fa8f21"></stop>
                                        <stop offset=".78" stop-color="#d82d7e"></stop>
                                        </radialGradient>
                                        <radialGradient id="b" cx="70.652" cy="96.49" r="113.963" gradientUnits="userSpaceOnUse">
                                        <stop offset=".64" stop-color="#8c3aaa" stop-opacity="0"></stop>
                                        <stop offset="1" stop-color="#8c3aaa"></stop>
                                        </radialGradient>
                                    </defs>
                                    <path fill="url(#a)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
                                    <path fill="url(#b)" d="M25.865,101.639A34.341,34.341,0,0,1,14.312,99.5a19.329,19.329,0,0,1-7.154-4.653A19.181,19.181,0,0,1,2.5,87.694,34.341,34.341,0,0,1,.364,76.142C.061,69.584,0,67.617,0,51s.067-18.577.361-25.14A34.534,34.534,0,0,1,2.5,14.312,19.4,19.4,0,0,1,7.154,7.154,19.206,19.206,0,0,1,14.309,2.5,34.341,34.341,0,0,1,25.862.361C32.422.061,34.392,0,51,0s18.577.067,25.14.361A34.534,34.534,0,0,1,87.691,2.5a19.254,19.254,0,0,1,7.154,4.653A19.267,19.267,0,0,1,99.5,14.309a34.341,34.341,0,0,1,2.14,11.553c.3,6.563.361,8.528.361,25.14s-.061,18.577-.361,25.14A34.5,34.5,0,0,1,99.5,87.694,20.6,20.6,0,0,1,87.691,99.5a34.342,34.342,0,0,1-11.553,2.14c-6.557.3-8.528.361-25.14.361s-18.577-.058-25.134-.361"></path>
                                    <path fill="#fff" d="M461.114,477.413a12.631,12.631,0,1,1,12.629,12.632,12.631,12.631,0,0,1-12.629-12.632m-6.829,0a19.458,19.458,0,1,0,19.458-19.458,19.457,19.457,0,0,0-19.458,19.458m35.139-20.229a4.547,4.547,0,1,0,4.549-4.545h0a4.549,4.549,0,0,0-4.547,4.545m-30.99,51.074a20.943,20.943,0,0,1-7.037-1.3,12.547,12.547,0,0,1-7.193-7.19,20.923,20.923,0,0,1-1.3-7.037c-.184-3.994-.22-5.194-.22-15.313s.04-11.316.22-15.314a21.082,21.082,0,0,1,1.3-7.037,12.54,12.54,0,0,1,7.193-7.193,20.924,20.924,0,0,1,7.037-1.3c3.994-.184,5.194-.22,15.309-.22s11.316.039,15.314.221a21.082,21.082,0,0,1,7.037,1.3,12.541,12.541,0,0,1,7.193,7.193,20.926,20.926,0,0,1,1.3,7.037c.184,4,.22,5.194.22,15.314s-.037,11.316-.22,15.314a21.023,21.023,0,0,1-1.3,7.037,12.547,12.547,0,0,1-7.193,7.19,20.925,20.925,0,0,1-7.037,1.3c-3.994.184-5.194.22-15.314.22s-11.316-.037-15.309-.22m-.314-68.509a27.786,27.786,0,0,0-9.2,1.76,19.373,19.373,0,0,0-11.083,11.083,27.794,27.794,0,0,0-1.76,9.2c-.187,4.04-.229,5.332-.229,15.623s.043,11.582.229,15.623a27.793,27.793,0,0,0,1.76,9.2,19.374,19.374,0,0,0,11.083,11.083,27.813,27.813,0,0,0,9.2,1.76c4.042.184,5.332.229,15.623.229s11.582-.043,15.623-.229a27.8,27.8,0,0,0,9.2-1.76,19.374,19.374,0,0,0,11.083-11.083,27.716,27.716,0,0,0,1.76-9.2c.184-4.043.226-5.332.226-15.623s-.043-11.582-.226-15.623a27.786,27.786,0,0,0-1.76-9.2,19.379,19.379,0,0,0-11.08-11.083,27.748,27.748,0,0,0-9.2-1.76c-4.041-.185-5.332-.229-15.621-.229s-11.583.043-15.626.229" transform="translate(-422.637 -426.196)"></path>
                                </svg>
                                {/* Thẻ div để hiện thanh dọc ngăn cách */}
                                <div
                                    style={{
                                    content: '""',
                                    position: 'absolute',
                                    top: 'calc(50% - 12px)',
                                    right: 'calc(0px - 14px)',
                                    height: '24px',
                                    border: '1px solid #E8E8E8',
                                    }}
                                ></div>
                            </div>
                            <div className='flex text-[16px] flex-1 item-center justify-center gap-2'>
                                {/* <i className="fa-regular fa-heart"></i> */}
                                <i className="fa-solid fa-heart text-[#FF3D00] text-[24px]"></i>
                                Đã thích ({product.likes})
                            </div>
                        </div>
                    </div>
                    {/* Nữa bên phải chứa thông tin đơn hàng */}
                    <div className='w-full flex flex-col'>
                        {/* Tên sản phẩm */}
                        <div className='text-[19px] leading-[23px] line-clamp-2'>
                            { product.favorite && 
                                <span className="inline-block text-white bg-[#EE4D2D] 
                                    px-1 rounded-[3px] mr-1 relative top-[-2px] flex-1 
                                    text-[14px] mr-2 leading-[18px]">
                                    Yêu thích
                                </span>
                            }
                            {product.name}
                        </div>
                        {/* Phần đánh giá */}
                        <div className='flex flex-row items-center my-3'>
                            {/* Phần điểm đánh giá */}
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
                            {/* Phần số lượng đánh giá và bán */}
                            <div className='relative flex items-center gap-[2px] justify-start text-[18px]'>
                                <div className='mr-1 underline underline-offset-[3px] decoration-1'>
                                    {numReviews}
                                </div>
                                <div className='text-[14px] text-[#767676] font-medium'>Đánh Giá</div>
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
                            <div className='flex items-center gap-[2px] justify-start text-[18px]'>
                                <div className='mr-1 text-[14px] text-[#767676] font-medium'>Đã Bán</div>
                                <div className=''>
                                    {formatSold(product.soldCount)}
                                </div>
                                <div className='w-[16px] h-[16px] text-[#767676] rounded-full border border-[#767676]
                                flex items-center justify-center leading-[16px] ml-2'>
                                    <i className="fa-solid fa-question text-[10px] text-[#767676]"
                                        style={
                                            { transform: 'translateY(1px)' }
                                        }>
                                    </i>
                                </div>
                            </div>
                        </div>
                        {/* Phần giá bán */}
                        <div className='w-full h-[64px] flex items-center justify-start bg-[#FAFAFA] gap-4 pl-6'>
                            <div className='text-[30px] font-medium text-[#ee4d2d] flex items-center'>
                                <i className="fa-solid fa-dong-sign text-[18px] relative top-[-2px]"></i>
                                { (minPrice * ( 100 - product.discount ) / 100).toLocaleString('vi-VN') }
                                <i className="fa-solid fa-minus text-[18px] mx-3"></i>
                                <i className="fa-solid fa-dong-sign text-[18px] relative top-[-2px]"></i>
                                { (maxPrice * ( 100 - product.discount ) / 100).toLocaleString('vi-VN') }
                            </div>
                            { product.discount && 
                            
                                <div className='relative text-[18px] text-[#929292]'>
                                    <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                                    { minPrice.toLocaleString('vi-VN') }
                                <i className="fa-solid fa-minus text-[10px] mx-1"></i>
                                    <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                                    { maxPrice.toLocaleString('vi-VN') }
                                    <div className='absolute top-[50%] right-0 w-full h-[1px] bg-[#929292]'></div>
                                </div>
                            }
                            { product.discount &&
                                <div className='text-[12px] text-[#ee4d2d] font-bold bg-[#feeeea] w-[34px] h-[18px]
                                flex items-center justify-center rounded-sm'>
                                    -{ product.discount }%
                                </div>
                            }
                        </div>
                        {/* Phần màu sắc và size */}
                        <div className='w-full flex flex-row justify-start pl-6 mt-6'>
                            <h2 className='font-normal text-[#757575] capitalize w-[100px] pt-[8px]'>
                                { product.attributeName }
                            </h2>
                            <div className='flex flex-row items-center justify-start flex-wrap gap-2 item-start'>
                                {
                                    reducedAttributes.map((attribute, index) => (
                                        <div key={index} className='flex items-center h-[40px] border border-[#e8e8e8] p-2 gap-2'>
                                            <div className=''
                                                style={{
                                                    width: '24px',
                                                    height: '24px',
                                                    backgroundImage: `url(${attribute.imageUrl})`,
                                                    backgroundSize: 'cover',
                                                    backgroundPosition: 'center',

                                                }}>
                                            </div>
                                            <span className='text-[15px] text-[#313131]'>{reducedAttributes[index]?.nameEach}</span>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                </div>
            }


            
        </div>
    );
};
export default ProductLayout;