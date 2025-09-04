import '../css/home.css';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from "react-router-dom";
import "../assets/Animation.css"
import { getAllProducts } from '../services/product.service';

function TrendingProducts() {
    const [products, setProducts] = useState([]);

    // Hàm gọi API lấy 48 sản phẩm
    const fetchProducts = useCallback(async () => {
        try {
            const response = await getAllProducts();
            // console.log('Đã lấy sản phẩm:', response.data);
            setProducts(response.data);
        } catch (error) {
            console.error('Lỗi khi fetch sản phẩm:', error);
        }
    }, []);

    // Hàm định dạng số lượng đã bán
    const formatSold = (sold) => {
        if (sold >= 1_000_000) return `${(sold / 1_000_000).toFixed(sold % 1_000_000 === 0 ? 0 : 1)}tr`;
        if (sold >= 1_000) return `${(sold / 1_000).toFixed(sold % 1_000 === 0 ? 0 : 1)}k`;
        return sold.toString();
    };


    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    return (
    <div className='w-full max-w-[1200px] relative'>
        <div className='h-[58px] text-[#ee4d2d] uppercase text-[18px] font-[400] bg-white 
            flex items-center justify-center border-b-[4px] border-[#ee4d2d] sticky top-[120px] z-30'
        >   
            Gợi Ý Hôm Nay
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 w-full">
            { products && products.map((product, index) => (
                <div key={product.id} className='group flex flex-col h-[300px] relative 
                hover:translate-y-[-1px] transition-transform duration-300 ease-out 
                hover:shadow-[0_0_4px_rgba(0,0,0,0.2)] z-10 hover:z-[20]'>
                    <Link to={`/product/${product.id}`} className='flex flex-col h-full w-full bg-white 
                    border border-[#DFDFDF] hover:border-[#ee4d2d] pb-2'>
                        <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                            style={{ backgroundImage: `url(${product.image.imageUrl})` }}
                            >
                        </div>
                        <div className='w-full flex flex-col justify-between px-2 flex-1'>
                            <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden 
                            h-[36px] line-clamp-2'>
                                { product.favorite && 
                                    <span className="inline-block text-white text-[11px] bg-[#EE4D2D] 
                                        leading-[14px] px-1 rounded-[3px] mr-1 relative top-[-2px]">
                                        Yêu thích
                                    </span>
                                }
                                {product.name}
                            </p>
                            <div className='flex flex-row justify-between items-center'>
                                <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start 
                                font-semibold'>
                                    <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                    {/* Hiển thị Giá tiền nhỏ nhất then VND */}
                                    {Math.min(...product.attributes.map(item => item.price)).toLocaleString('vi-VN')}
                                </div>
                                <div className='w-full text-end text-[12px]'>
                                    Đã bán {formatSold(product.soldCount)}
                                </div>
                            </div>
                        </div>
                    </Link>
                    <div className='h-[35px] text-[15px] text-white bg-[#ee4d2d] border border-[#ee4d2d] 
                    rounded-b-[3px] absolute top-[100%] left-0 right-0 z-10 opacity-0 
                    transition-all duration-100 ease-in-out 
                    group-hover:opacity-100 group-hover:translate-y-0'>
                        <Link to={`/product/find_similar_item/${product.name}`} className='w-full h-full 
                        flex items-center justify-center'> 
                            Tìm sản phẩm tương tự
                        </Link>
                    </div>
                </div>
                ))
            }
        </div>
        <div className='w-full flex items-center justify-center mt-10'>
            <Link to="/product/TrendingProduct?pageNumber=2" className='w-[380px] h-[40px] bg-[white] 
            text-[#555] text-center text-[16px] border border-[#DFDFDF] flex items-center justify-center 
            hover:bg-[#E5E5E5] rounded-[3px]'>
                Xem Thêm
            </Link>
        </div>
    </div>
    );
}
export default TrendingProducts;    