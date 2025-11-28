import PrimaryButton from '../buttons/Button';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addItem } from '../../features/cart/cartSlice';
import { formatSold, formatRating } from '../../utils/numberFormat';

function DataRight({ product, user, addToast, rating, numReviews, setSelectedImage, isPhone, isIPad }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // Sử dụng useState để giá trị số lượng sản phẩm
    const [value, setValue] = useState(1);

    // Sử dụng biến để lưu min-max giá, mảng giá để dùng hiển thị
    const prices = product?.attributes?.map(attr => attr.price) || [];
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 0;

    // Sử dụng useState để lưu các thuộc tính đã giảm bớt trùng lặp
    const [reducedAttributes, setReducedAttributes] = useState([]);
    const [reducedSizes, setReducedSizes] = useState([]);

    // Sử dụng useState để lưu các thuộc tính đang được chọn
    const [focusColor, setFocusColor] = useState(null);
    const [focusSize, setFocusSize] = useState(null);
    const [focusAttribute, setFocusAttribute] = useState(null);

    // Sử dụng useState để lưu các thuộc tính hợp lệ dựa trên focusColor và focusSize
    const [validAttribute, setValidAttribute] = useState([]);
    const [validSize, setValidSize] = useState([]);

    // Tính số lượng sản phẩm còn trong kho dựa trên focusAttribute
    const stock = product?.stockCounts.find(attr => attr.attributeID === focusAttribute?.id)?.count || 0

    // Sử dụng useState để lưu các mã hàng còn trong kho
    // inStockProduct là mảng chứa tên và kích thước của các sản phẩm còn
    const [inStockProduct, setInStockProduct] = useState([]);

    // 1. Sử dụng useEffect để xử lí data trong product.attribute
    useEffect(() => {
        if (product?.attributes) {
            const map = new Map();
            const sizeMap = new Map();
            product.attributes.forEach(attr => {
                if (attr.nameEach && !map.has(attr.nameEach)) {
                    map.set(attr.nameEach, attr);
                }
                if (attr.size && !sizeMap.has(attr.size)) {
                    sizeMap.set(attr.size, attr);
                }
            });
            setReducedAttributes(Array.from(map.values()));
            setReducedSizes(Array.from(sizeMap.values()));
            // console.log('Reduced Attributes:', Array.from(map.values()));
            // console.log('Reduced Sizes:', Array.from(sizeMap.values()));
        }
    }, [product]);

    // Các hàm xử lí tăng, giảm số lượng sản phẩm; 
    // thay đổi giá trị input; xử lí blur (khi mất focus trong input) trong input
    const quantityIncrease = () => {
        setValue(prevValue => prevValue + 1);
    };

    const quantityDecrease = () => {
        setValue(prevValue => Math.max(1, prevValue - 1));
    };

    const handleQuantityChange = (e) => {
        const newValue = parseInt(e.target.value) || 1;
        setValue(Math.max(1, newValue));
    };
    
    const handleBlur = () => {
        if (value > stock) {
            setValue(stock);
        } else if (value < 1) {
            setValue(1);
        }
    };

    // 1. sử dụng useEffect để tìm focusAttribute dựa trên focusColor và focusSize
    // 2. sử dụng useEffect để tìm validAttribute và validSize dựa trên focusColor và focusSize, 
    // áp dụng để vô hiệu hóa việc chọn sản phẩm không có trong kho
    useEffect(() => {
        const found = product?.attributes.find(attr => attr.nameEach === focusColor && (attr.size === focusSize || (focusSize === null && reducedSizes.length === 0)));
        setFocusAttribute(found);

        if (focusSize) {
            const validAttributes = product?.attributes.filter(attr => attr.size === focusSize);
            setValidAttribute(validAttributes);
        } 
        if (focusColor) {
            const validSizes = product?.attributes.filter(attr => attr.nameEach === focusColor);
            setValidSize(validSizes);
        }
    }, [focusColor, focusSize, product, reducedSizes]);

    // Sử dụng useEffect để đặt giá trị ban đầu cho value khi focusAttribute thay đổi
    useEffect(() => {
        setValue(1);
    }, [focusAttribute]);

    // Sử dụng useEffect để kiểm tra các mã hàng còn trong kho không?
    useEffect(() => {
        const inStock = [];
        if (product?.stockCounts) {
            product.stockCounts.forEach(attr => {
                if (attr.count > 0) {
                    const matchedAttr = product.attributes.find(
                        a => a.id === attr.attributeID
                    );
                    // console.log('In Stock Name:', matchedAttr?.nameEach);
                    // console.log('In Stock Size:', matchedAttr?.size);
                    inStock.push(matchedAttr?.nameEach);
                    inStock.push(matchedAttr?.size);
                }
            });
        }
        setInStockProduct(inStock);
    }, [product]);

    // Hàm xử lí thêm sản phẩm vào giỏ hàng
    const handleAddToCart = () => {
        if (!user) {
            navigate('/auth/login');
            return;
        }
        if (focusAttribute) {
            const item = {
                id: product.id,
                name: product.name,
                imageUrl: product.image[0].imageUrl,
                attributes: product.attributes,
                stock: product.stockCounts,
                discount: product.discount,
                quantity: value,
                selectedAttributes: {
                    color: focusColor,
                    size: focusSize,
                    attribute: focusAttribute
                }
            };
            addToast('Thêm vào giỏ hàng thành công', 'success', 'check');
            dispatch(addItem(item));
        } else {
            addToast('Vui lòng chọn đầy đủ thuộc tính', 'error', 'warning');
        }
    };
    
    return (
        <div className='w-full min-w-0 flex flex-col flex-1'>
            {/* Tên sản phẩm */}
            <div className='text-[19px] leading-[23px] line-clamp-2 w-full break-words'>
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
            <div className='w-full md:w-auto flex flex-row items-center justify-center md:justify-start my-3'>
                {/* Phần điểm đánh giá */}
                <div className='relative flex gap-[2px] justify-start items-center text-lg'>
                    <div className='mr-1 underline underline-offset-[3px] decoration-1'>
                        {formatRating(rating)}
                    </div>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <i
                            key={i}
                            className={`text-[12px] ${ (rating <= i && rating > i - 1) || rating >= i ? 'fa-solid' : 'fa-regular'
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
                <div className='relative flex items-center gap-[2px] justify-start text-lg'>
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
                <div className='flex items-center gap-[2px] justify-start text-lg'>
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
            <div className='w-full h-14 md:h-[64px] flex items-center justify-center md:justify-start bg-[#FAFAFA] gap-4 md:pl-6'>
                { focusColor && (focusSize || (focusSize === null && reducedSizes.length === 0)) && focusAttribute ? (
                    <div className='text-2xl md:text-xl lg:text-[30px] font-medium text-[#ee4d2d] flex items-center'>
                        <i className="fa-solid fa-dong-sign text-[14px] lg:text-[18px] relative top-[-2px]"></i>
                        { (focusAttribute.price * ( 100 - product.discount ) / 100).toLocaleString('vi-VN') }
                    </div>
                ) : (
                    <div className='text-2xl md:text-xl lg:text-[30px] font-medium text-[#ee4d2d] flex items-center'>
                        <i className="fa-solid fa-dong-sign text-[14px] lg:text-[18px] relative top-[-2px]"></i>
                        { (minPrice * ( 100 - product.discount ) / 100).toLocaleString('vi-VN') }
                        <i className="fa-solid fa-minus text-[18px] mx-3"></i>
                        <i className="fa-solid fa-dong-sign text-[14px] lg:text-[18px] relative top-[-2px]"></i>
                        { (maxPrice * ( 100 - product.discount ) / 100).toLocaleString('vi-VN') }
                    </div>
                )}
                { focusAttribute && product.discount ? (
                    <div className='hidden lg:block relative text-[18px] text-[#929292] whitespace-nowrap'>
                        <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                        { focusAttribute.price.toLocaleString('vi-VN') }
                        <div className='absolute top-[50%] right-0 w-full h-[1px] bg-[#929292]'></div>
                    </div>
                ) : (
                    <div className='hidden lg:block relative text-[18px] text-[#929292] whitespace-nowrap'>
                        <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                        { minPrice.toLocaleString('vi-VN') }
                        <i className="fa-solid fa-minus text-[10px] mx-1"></i>
                        <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                        { maxPrice.toLocaleString('vi-VN') }
                        <div className='absolute top-[50%] right-0 w-full h-[1px] bg-[#929292]'></div>
                    </div>
                )}
                { product.discount &&
                    <div className='text-[12px] text-[#ee4d2d] font-bold bg-[#feeeea] w-[34px] h-[18px]
                        flex items-center justify-center rounded-sm'>
                        -{ product.discount }%
                    </div>
                }
            </div>
            {/* Phần màu sắc và size */}
            { reducedAttributes.length > 0 && (
                <div className='w-full flex flex-row justify-start pl-6 mt-6'>
                    <h2 className='font-normal text-[#757575] capitalize w-[100px] pt-[8px] flex-shrink-0'>
                        { product.attributeName }
                    </h2>
                    <div className='flex flex-row items-center justify-start flex-wrap gap-2 item-start w-[400px]
                        max-h-[130px] overflow-y-auto'>
                        {
                            reducedAttributes.map((attribute, index) => (
                                <div key={index} className={`relative flex items-center h-[32px] md:h-9 lg:h-10 border p-2 gap-2
                                    ${focusColor === attribute.nameEach ? 'border-primaryColor text-primaryColor' : 'border-[#e8e8e8] text-inherit'}
                                    hover:border-primaryColor hover:text-primaryColor cursor-pointer select-none rounded-sm
                                    ${!validAttribute.some(item => item.nameEach === attribute.nameEach) && focusSize
                                        ? 'pointer-events-none opacity-50' : ''}
                                    ${!inStockProduct.includes(attribute.nameEach) ? 'pointer-events-none opacity-50' : ''}`}
                                    onClick={() => {setFocusColor(focusColor === attribute.nameEach ? null : attribute.nameEach);
                                        setSelectedImage(focusColor === attribute.nameEach ? null : attribute.imageUrl)
                                    }}
                                    // Cơ chế Hover để xem trước ảnh sản phẩm giống ImagePreview.jsx
                                    onMouseEnter={() => setSelectedImage(attribute.imageUrl)}
                                    onMouseLeave={() => setSelectedImage(focusColor === attribute.nameEach ? attribute.imageUrl : null)}
                                >   
                                    { attribute.imageUrl !== '' &&
                                        <div className='hidden md:block'
                                            style={{
                                                width: !isIPad ? '24px' : '20px',
                                                height: !isIPad ? '24px' : '20px',
                                                backgroundImage: `url(${attribute.imageUrl})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center'
                                            }}>
                                        </div>
                                    }
                                    <span className='text-sm lg:text-[15px] text-inherit'>{reducedAttributes[index]?.nameEach}</span>
                                    { focusColor === attribute.nameEach && 
                                        <div className="absolute bottom-0 right-0 w-0 h-0 
                                            border-b-[14px] border-l-[14px] border-b-primaryColor border-l-transparent">
                                            <i className="fa-solid fa-check text-white text-[9px] absolute right-[0px] top-[5px]"></i>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            { reducedSizes.length > 0 && (
                <div className='w-full flex flex-row justify-start pl-6 mt-6'>
                    <h2 className='font-normal text-[#757575] capitalize pt-[8px] w-[100px] flex-shrink-0'>
                        Kích Thước
                    </h2>
                    <div className={`flex flex-row items-center justify-start flex-wrap gap-2 flex-1 max-w-[430px] 
                        max-h-[${40*3 + 8*2}px] overflow-y-auto`}>
                        {
                            reducedSizes.map((attribute, index) => (
                                <div key={index} className={`relative flex items-center h-[32px] md:h-9 lg:h-10 border
                                    ${focusSize === attribute.size ? 'border-primaryColor text-primaryColor' : 'border-[#e8e8e8] text-inherit'}
                                    p-2 text-sm lg:text-[15px] hover:border-primaryColor hover:text-primaryColor cursor-pointer select-none rounded-sm
                                    ${!validSize.some(item => item.size === attribute.size) && focusColor
                                        ? 'pointer-events-none opacity-50' : ''}
                                    ${!inStockProduct.includes(attribute.size) ? 'pointer-events-none opacity-50' : ''}`}
                                    onClick={() => setFocusSize(
                                        focusSize === attribute.size ? null : attribute.size
                                    )}>
                                    { attribute.size }
                                    { focusSize === attribute.size && 
                                        <div className="absolute bottom-0 right-0 w-0 h-0 
                                            border-b-[14px] border-l-[14px] border-b-primaryColor border-l-transparent">
                                            <i className="fa-solid fa-check text-white text-[9px] absolute right-[0px] top-[5px]"></i>
                                        </div>
                                    }
                                </div>
                            ))
                        }
                    </div>
                </div>
            )}
            {/* Phần điều chỉnh số lượng */}
            <div className='relative w-full flex flex-row justify-start pl-6 mt-6'>
                <h2 className='font-normal text-[#757575] capitalize pt-[8px] w-[100px] flex-shrink-0'>
                    Số lượng
                </h2>
                <div className='flex items-center h-9 lg:h-10 border border-[#CCCCCC] text-sm md:text-[15px] text-inherit'>
                    <button className={`w-8 lg:w-10 h-full flex items-center justify-center
                        border-r border-[#CCCCCC] flex-1 text-[12px]
                        ${ value === 1 || !focusAttribute ? 'text-[#CCCCCC]' : ''}`}
                        disabled={!focusAttribute}
                        onClick={quantityDecrease}
                    >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={focusAttribute ? value : 1}
                        disabled={!focusAttribute}
                        onChange={handleQuantityChange}
                        onBlur={handleBlur}
                        className={`flex-1 h-full text-center [appearance:textfield] max-w-[60px] lg:max-w-[80px]
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none
                        focus:outline-none
                        bg-transparent
                        ${focusAttribute ? 'text-primaryColor' : 'text-[#CCCCCC]'}`}
                    />
                    <button className={`w-8 lg:w-10 h-full flex items-center justify-center
                        border-l border-[#CCCCCC] flex-1 text-[12px]
                        ${focusAttribute ? '' : 'text-[#CCCCCC]'}`}
                        onClick={quantityIncrease}
                        disabled={!focusAttribute || value >= stock}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                { focusAttribute &&
                    <p className='text-[#757575] text-sm pt-[8px] flex-shrink-0 ml-4'>
                        {stock} {isPhone ? 'có sẵn' : 'sản phẩm có sẵn' }
                    </p>                            
                }
            </div>
            {/* Phần nút thêm vào giỏ hàng */}
            <div className='w-full flex flex-row justify-evenly md:justify-start pl-0 md:pl-6 mt-8 md:mt-10 gap-4'>
                <button className='w-[170px] md:w-[180px] lg:w-[200px] h-[40px] md:h-[48px] bg-[#FFEEE8] text-primaryColor rounded border border-primaryColor
                text-[16px] flex items-center justify-center gap-1'
                    onClick={handleAddToCart}
                    // disabled={!focusAttribute}
                >
                    <i className="fa-solid fa-cart-shopping" style={{ transform: 'translateY(1px)' }}></i>
                    Thêm vào giỏ hàng
                </button>
                <PrimaryButton height={isPhone ? '40px' : '48px'} width={isPhone ? '170px' : (isIPad ? '180px' : '200px')} text="Mua Ngay" />
            </div>
        </div>
    )
}

export default DataRight;