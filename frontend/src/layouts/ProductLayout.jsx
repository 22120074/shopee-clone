import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getOneProduct } from '../services/product.service';
import useToastQueue from '../hooks/useToastQueue';
import LeftData from '../components/productComponents/dataLeft';
import RightData from '../components/productComponents/dataRight';
import DataDetailProduct from '../components/productComponents/dataDetailProduct';
import ToastQueue from '../components/productComponents/toastQueueProduct';


function ProductLayout() {
    // Sử dụng useParams để lấy productName từ URL
    // productName là tên sản phẩm được truyền vào URL, ví dụ: /product/:productName
    // setProduct là hàm để cập nhật state product
    const { productName } = useParams();
    const [product, setProduct] = useState();

    // sử dụng useSelector để lấy thông tin người dùng
    const user = useSelector((state) => state.auth.currentUser);

    // Sử dụng useToastQueue để hiển thị thông báo
    const { toasts, addToast } = useToastQueue(3, 1500);

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

    return (
        <div className="w-full bg-[#F5F5F5] h-auto">
            {/* Toast Queue để hiển thị thông báo thành công*/}
            <ToastQueue toasts={toasts} />
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
                    <LeftData product={product} user={user} />
                    {/* Nữa bên phải chứa thông tin đơn hàng */}
                    <RightData product={product} user={user} addToast={addToast} />
                </div>
            }
            { product && 
                <DataDetailProduct product={product} />
            }


            
        </div>
    );
};
export default ProductLayout;