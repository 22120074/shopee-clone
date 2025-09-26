import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOneProduct } from '../../services/product.service';
import { createOrupdateCart } from '../../services/cart.service';
import useToastQueue from '../../hooks/useToastQueue';
import useIsWindow from '../../hooks/useIsWindow';
import LeftData from '../../components/productComponents/dataLeft';
import RightData from '../../components/productComponents/dataRight';
import DataDetailProduct from '../../components/productComponents/dataDetailProduct';
import ToastQueue from '../../components/productComponents/toastQueueProduct';
import DataRatingProduct from '../../components/productComponents/dataRating';

function ProductPage() {
    const isPhone = useIsWindow('(max-width: 768px)');
    const isIPad = useIsWindow('(min-width: 769px) and (max-width: 1024px)');

    // Sử dụng useParams để lấy productName từ URL
    // productName là tên sản phẩm được truyền vào URL, ví dụ: /product/:productName
    const { productName } = useParams();
    const [product, setProduct] = useState();

    // sử dụng useSelector để lấy thông tin người dùng
    const user = useSelector((state) => state.auth.currentUser);

    // Lấy thông tin giỏ hàng từ Redux store
    const items = useSelector((state) => state.cart.items);
    const totalQuantity = useSelector((state) => state.cart.totalQuantity);
    const totalPrice = useSelector((state) => state.cart.totalPrice);

    // Sử dụng useToastQueue để hiển thị thông báo
    const { toasts, addToast } = useToastQueue(3, 1500);

    // Sử dụng useState để lưu rating, numReviews
    const [rating, setRating] = useState(0);
    const [numReviews, setNumReviews] = useState(0);

    const [selectedImage, setSelectedImage] = useState(null);

    const fetchProducts = async (productName, setProduct) => {
        try {
            const product = await getOneProduct(productName);
            setProduct(product.data);
            console.log('Fetched Products:', product.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Sử dụng useEffect để gọi API khi productName thay đổi
    useEffect(() => {
        if (productName) {
            fetchProducts(productName, setProduct);
        }
    }, [productName]);

    // 1. Sử dụng useEffect để tính rating và số lượng đánh giá
    useEffect(() => {
        if (product?.ratings?.length > 0) {
            const total = product.ratings.reduce((sum, item) => sum + item.rate, 0);
            setRating(total / product.ratings.length);
            setNumReviews(product.ratings.length);
        } else {
            setRating(0);
            setNumReviews(0);
        }
    }, [product]);

    useEffect(() => {
        const syncCart = async () => {
            await createOrupdateCart({
                userId: user.userId || user.googleID,
                items: items,
                totalQuantity: totalQuantity,
                totalPrice: totalPrice,
            });
        };
        if (user?.userId || user?.googleID) {
            syncCart();
        }
    }, [items, user?.userId, user?.googleID, totalQuantity, totalPrice]);

    return (
    <div className="w-full bg-[#F5F5F5] h-auto">
        {/* Toast Queue để hiển thị thông báo thành công*/}
        <ToastQueue toasts={toasts} />
        { product && !isPhone &&
            // Đường dẫn category 
            <div className='max-w-[1200px] mx-auto md:px-6 lg:px-0 flex gap-2 h-[56px] text-xs text-black tracking-widest items-center overflow-hidden'>
                <Link to="/" className='font-normal text-blue-600 whitespace-nowrap' >Shopee</Link> 
                <i className="fa-solid fa-chevron-right text-[10px] translate-y-[1px] text-[#696969]"></i>
                <Link to={`/category/${product.category}`} className='font-normal text-blue-600 whitespace-nowrap'>{product.category}</Link>
                <i className="fa-solid fa-chevron-right text-[10px] translate-y-[1px] text-[#696969]"></i>
                <div className='font-medium text-[#313131] whitespace-nowrap overflow-hidden overflow-ellipsis'>{product.name}</div>
            </div>
        }
        {/* Hiển thị thông tin sản phẩm */}
        { product &&
            <div className={`max-w-[1200px] w-full mx-auto p-2 md:p-4 flex bg-white rounded-sm gap-3 md:gap-6 lg:gap-[36px] h-auto 
                ${isPhone ? 'flex-col' : ''}`}
            >
                {/* Nữa bên trái chứa hình ảnh, chia sẻ, lượt thích */}
                <LeftData product={product} user={user} selectedImage={selectedImage} isPhone={isPhone} isIPad={isIPad} />
                {/* Nữa bên phải chứa thông tin đơn hàng */}
                <RightData product={product} user={user} addToast={addToast} rating={rating} numReviews={numReviews} 
                    setSelectedImage={setSelectedImage} isPhone={isPhone} isIPad={isIPad}
                />
            </div>
        }
        { product && 
            <DataDetailProduct product={product} />
        }
        { product && 
            <DataRatingProduct product={product} rating={rating} numReviews={numReviews} isPhone={isPhone} />
        }
        
    </div>
    );
};
export default ProductPage;