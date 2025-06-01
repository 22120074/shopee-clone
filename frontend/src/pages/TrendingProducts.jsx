import './home.css';
import React, { useState } from 'react';
import { Link } from "react-router-dom";

function TrendingProducts() {


    return (
    <div className='w-full max-w-[1200px]'>
        <div className='h-[58px] text-[#ee4d2d] uppercase text-[18px] font-[400] bg-white flex items-center justify-center border-b-[4px] border-[#ee4d2d]'>   
            Gợi Ý Hôm Nay
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 p-2 w-full">
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
            <div className='flex flex-col h-[300px]'>
                <Link to="/product/1" className='flex flex-col h-full w-full bg-white border border-[#DFDFDF] pb-2'>
                    <div className='w-full h-[190px] bg-gray-200 bg-cover bg-no-repeat bg-center' 
                        style={{ backgroundImage: 'url(https://via.placeholder.com/150)' }}>
                    </div>
                    <div className='w-full flex flex-col justify-between px-2 flex-1'>
                        <p className='text-[14px] leading-[18px] text-start mt-[10px] overflow-hidden h-[36px] line-clamp-2'>
                            Quạt cầm tay M2 5000mAh di động có thể mang đến bất kì đâu
                        </p>
                        <div className='flex flex-row justify-between items-center'>
                            <div className='text-[#EE4D2D] flex items-end gap-[2px] justify-start font-semibold'>
                                <i className="fa-solid fa-dong-sign text-[12px] relative top-[-4px]"></i>
                                50.000
                            </div>
                            <div className='w-full text-end text-[12px]'>
                                Đã bán 2,6k
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    </div>
    );
}
export default TrendingProducts;    