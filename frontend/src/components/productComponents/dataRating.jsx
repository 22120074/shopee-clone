import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getProductReviews, getEachNumofTypeRating } from "../../services/product.service";
import { getUserRating } from "../../services/user.service";
import { formatNumber, formatDate, formatRating } from "../../utils/numberFormat";
import VideoHls from './../VideoHls';
import NormalButton from "../../components/NormalButton";
import ListRatingSkeleton from "../skeletons/listRatingSkeleton";
import Pagination from "../Pagination";

function DataRatingProduct({ product, rating }) {
    const ratingRef = useRef(null);
    // Sử dụng useState để quản lý trạng thái của reviews và media hiển thị, index slide, index page, total pages
    const [reviews, setReviews] = useState([]);
    const [dataUserList, setDataUserList] = useState([]);
    const [loadingUserList, setLoadingUserList] = useState(true);
    const [showMedia, setShowMedia] = useState(null);
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const [currentPageIndex, setCurrentPageIndex] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOption, setSortOption] = useState('all');
    // 1: all
    // 2: 5, 3: 4, 4: 3, 5: 2, 6: 1
    // 7: hasImage, hasVideo 
    const [eachNumReview, setEachNumReview] = useState({
        all: 0,
        withMedia: 0,
        5: 0, 4: 0, 3: 0, 2: 0, 1: 0
    });

    const fetchReviews = async (id, limit, page, sortOption) => {
        try {
            const response = await getProductReviews(id, limit, page, sortOption);
            if (sortOption === 'all') {
                setReviews(response.data.reviews.rows);
                setTotalPages(response.data.totalPages);
                setCurrentPageIndex(response.data.currentPage - 1);
            } else if (sortOption === 'image_video') {
                setReviews(response.data.rows);
                setTotalPages(response.data.totalPages);
                setCurrentPageIndex(response.data.currentPage - 1);
            } else {
                setReviews(response.data.rows);
                setTotalPages(response.data.totalPages);
                setCurrentPageIndex(response.data.currentPage - 1);
            }
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
        }
    };

    const fetchEachNumReview = async (id) => {
        try {
            const response = await getEachNumofTypeRating(id);
            setEachNumReview({
                all: response.data.all.count,
                withMedia: response.data.withMedia,
                5: response.data[5] ? response.data[5] : 0,
                4: response.data[4] ? response.data[4] : 0,
                3: response.data[3] ? response.data[3] : 0,
                2: response.data[2] ? response.data[2] : 0,
                1: response.data[1] ? response.data[1] : 0,
            });
        } catch (error) {
            console.error("Lỗi khi lấy số lượng đánh giá theo loại:", error);
        }
    };

    const fetchDataUserList = async (userIds) => {
        try {
            const response = await getUserRating({ data: userIds });
            setDataUserList(response.data.ratings);
        } catch (error) {
            console.error("Lỗi khi lấy thông tin người dùng:", error);
        }
    };

    // Sử dụng useEffect để để lấy các đánh giá, và số lượng đánh giá theo loại
    useEffect(() => {
        if (product) {
            fetchReviews(product.id, 6, 1, sortOption);
            fetchEachNumReview(product.id);
        }
    }, [product, sortOption]);

    // Sử dụng useEffect để lấy thông tin người dùng của các đánh giá
    useEffect(() => {
        setLoadingUserList(true);
        if (reviews.length > 0) {
            const userIds = reviews.map(review => review.dataUserId);
            // console.log("userIds", userIds);
            fetchDataUserList(userIds);
        }
        const timer = setTimeout(() => {
            setLoadingUserList(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, [reviews]);
    
    // Hàm xử lý khi chuyển trang
    const handlePageChange = (page) => {
        if (page < 0 || page >= totalPages) return;
        fetchReviews(product.id, 6, page + 1, sortOption);
        setCurrentPageIndex(page);
        ratingRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const handleSort = (typeSort, page) => {
        fetchReviews(product.id, 6, page, typeSort);
        setSortOption(typeSort);
        ratingRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    const viewVideoandImages = (review) => {
        const totalSlides = review.Video_Ratings.length + review.Image_Ratings.length;
        const goNext = () => {
            setCurrentSlideIndex(i => (i + 1) % totalSlides);
        };        
        const goPrev = () => {
            setCurrentSlideIndex(i => (i - 1 + totalSlides) % totalSlides);
        };    

        return (        
        <div className="fixed inset-0 z-30">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-80 z-10" onClick={() => setShowMedia(null)} />
            {/* Phần chứa Slider chỉ hiển thị phần giới hạn */}
            <div className='relative flex items-center justify-start w-[800px] h-full m-auto overflow-hidden z-5'>
                {/* Slider ảnh và video */}
                <div className={`flex items-center justify-start h-auto max-h-[500px] transition-transform duration-500 ease-in-out z-20`}
                    style={{ transform: `translateX(-${currentSlideIndex * 800}px)`,
                            width: `${(review.Video_Ratings.length + review.Image_Ratings.length) * 800}px`
                }}>
                    {review.Video_Ratings.map((video, _) => (
                        <div key={video.id} className="w-[800px] h-auto flex items-center justify-center text-center" onClick={() => setShowMedia(null)}>
                            <VideoHls className={"flex items-center justify-center w-auto max-w-[800px] h-auto max-h-[500px] rounded-sm"}
                                src={`${process.env.REACT_APP_API_URL}${video.videoUrl}`}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    ))}
                    {review.Image_Ratings.map((img, _) => (
                        <div key={img.id} className="w-[800px] h-auto flex items-center justify-center text-center" onClick={() => setShowMedia(null)}>
                            <img className="w-auto max-w-[800px] h-auto max-h-[500px] rounded-sm" alt="review"
                                src={`${process.env.REACT_APP_API_URL}${img.imageUrl}`}
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>
                    ))}
                </div>
                {/* Phần hiển thị thumbnail bên dưới để chuyển index nhanh hơn */}
                <div className="flex gap-3 absolute bottom-8 left-1/2 translate-x-[-50%] z-20">
                    {review.Video_Ratings.length > 0 && (
                        <div className="flex gap-3">
                            {review.Video_Ratings.map((video, idx) => (
                                <div key={idx} className="relative w-[50px] h-[50px] rounded-sm" onClick={() => setCurrentSlideIndex(idx)}>
                                    <img key={idx} src={`${process.env.REACT_APP_API_URL}${video.thumbnailUrl}`} alt="thumbnail"
                                        className="w-[50px] h-[50px] rounded-sm"
                                    />
                                    <div className="absolute bottom-0 left-0 bg-moregrayTextColor bg-opacity-70 w-full h-4">
                                        <i className="absolute text-xs fa-solid fa-video text-white top-1/2 left-0 transform translate-x-[4px] -translate-y-1/2"></i>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {review.Image_Ratings.length > 0 && (
                        <div className="flex gap-3">
                            {review.Image_Ratings.map((img, idx) => (
                                <img key={idx} src={`${process.env.REACT_APP_API_URL}${img.imageUrl}`} alt="review"
                                    className="w-[50px] h-[50px] rounded-sm"
                                    onClick={() => setCurrentSlideIndex(review.Video_Ratings.length + idx)}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>
            {/* Phần chuyển trang */}
            <button className="absolute w-[50px] h-[50px] text-xl rounded-full top-1/2 translate-y-[-50%] bg-white border-none shadow-[0_0_8px_rgba(0,0,0,0.3)] 
                text-black px-2 cursor-pointer left-[140px] z-20" onClick={goPrev}>
                <i className="fa-solid fa-chevron-left pointer-events-none"></i>
            </button>
            <button className="absolute w-[50px] h-[50px] text-xl rounded-full top-1/2 translate-y-[-50%] bg-white border-none shadow-[0_0_8px_rgba(0,0,0,0.3)] 
                text-black px-2 cursor-pointer right-[140px] z-20" onClick={goNext}>
                <i className="fa-solid fa-chevron-right pointer-events-none"></i>
            </button>
        </div>
    )};
    
    return (
    <div ref={ratingRef} className="max-w-[1200px] w-full flex flex-col items-center justify-center h-auto mx-auto bg-white mt-6 p-6 rounded-sm ">
        { showMedia && reviews.length > 0 && viewVideoandImages(showMedia) }
        <h1 className="w-full capitalize bg-gray-50 h-14 flex items-center px-4 rounded-sm text-xl">
            Đánh giá sản phẩm
        </h1>
        {/* Phần hiển thị tổng quan đánh giá */}
        <div className="w-full h-32 flex px-10 bg-primaryRatingColor mt-5 rounded-sm border border-primaryBorderRating">
            <div className='relative h-full flex flex-col gap-2 justify-center items-center'>
                <div className='flex gap-1 items-end text-primaryColor text-4xl'>
                    {formatRating(rating)}
                    <div className='text-xl'>
                        trên 5
                    </div>
                </div>
                <div className='flex text-xl'>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <i key={i}
                            className={`${(rating <= i && rating > i - 1) || rating >= i ? 'fa-solid' : 'fa-regular'} fa-star text-primaryColor`}
                        ></i>
                    ))}
                </div>
            </div>
            <div className="h-auto w-full flex flex-wrap items-center justify-center gap-x-3 gap-y-1 py-4">
                <NormalButton typeSort={'all'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`Tất cả (${eachNumReview.all})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
                <NormalButton typeSort={'5'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`5 sao (${eachNumReview[5]})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
                <NormalButton typeSort={'4'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`4 sao (${eachNumReview[4]})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
                <NormalButton typeSort={'3'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`3 sao (${eachNumReview[3]})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
                <NormalButton typeSort={'2'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`2 sao (${eachNumReview[2]})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
                <NormalButton typeSort={'1'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`1 sao (${eachNumReview[1]})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts) => handleSort(ts)}  
                />
                <NormalButton typeSort={'image_video'} sortOption={sortOption} min_width={"100px"} height={"32px"} text={`Hình ảnh/Video (${eachNumReview.withMedia})`}
                    pageIndex={currentPageIndex + 1}
                    onClick={(ts, pageIndex) => handleSort(ts, pageIndex)}  
                />
            </div>
        </div>
        {/* Phần hiển thị các đánh giá cụ thể */}
        { loadingUserList ? <ListRatingSkeleton /> : (
            reviews.length > 0 && dataUserList.length > 0 && reviews.length === dataUserList.length ? (
                <div className="flex flex-col gap-4 w-full mt-4">
                    { reviews.map((review, idx) => (
                        <div key={review.id} className="w-full h-auto grid grid-cols-[50px_1fr] pb-14 border-b border-gray-300 p-3">
                            {/* Avatar */}
                            <Link to="/user" className="flex items-start justify-center gap-2"> 
                                <div className='w-[32px] h-[32px] rounded-full overflow-hidden'>
                                    <img src={dataUserList[idx].avatarUrl || "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"} alt="avatar" className="user_avatar" />
                                </div>
                            </Link>
                            {/* Hiển thị thông tin bình luận */}
                            <div className="flex flex-col flex-1 gap-3">
                                {/* Phần tên, điểm, ngày giờ đánh giá */}
                                <div className="flex flex-col items-start justify-start text-xs gap-2">
                                    <div className="">{dataUserList[idx].name || formatNumber(dataUserList[idx].phone)}</div>
                                    <div className='flex'>
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <i key={i}
                                                className={`${(review.rate <= i && review.rate > i - 1) || review.rate >= i ? 'fa-solid' : 'fa-regular'} fa-star text-primaryColor`}
                                            ></i>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <div className="text-gray-500">{formatDate(review.createdAt, 'yyyy-MM-dd HH:mm')}</div>
                                        <div className="flex h-4 w-0 border border-gray-300"></div>
                                        <div>Phân loại hàng: {review.Attribute.nameEach}, {review.Attribute.size}</div>
                                    </div>
                                </div>
                                {/* Phần nội dung bình luận */}
                                <div className="pr-12">{review.comment}</div>
                                {/* Phần hiển thị video và hình ảnh */}
                                <div className="flex gap-3">
                                    {review.Video_Ratings?.length > 0 && (
                                        <div className="flex gap-3">
                                            {review.Video_Ratings.map((video, idx) => (
                                                <div key={video.id} className="relative w-[70px] h-[70px] rounded-sm cursor-pointer"
                                                    onClick={() => {setShowMedia(review)
                                                    setCurrentSlideIndex(idx)
                                                }}>
                                                    <img key={video.thumbnailUrl} src={`${process.env.REACT_APP_API_URL}${video.thumbnailUrl}`} alt="thumbnail"
                                                        className="w-[70px] h-[70px] rounded-sm"
                                                    />
                                                    <div className="absolute bottom-0 left-0 bg-moregrayTextColor bg-opacity-70 w-full h-4">
                                                        <i className="absolute text-xs fa-solid fa-video text-white top-1/2 left-0 transform translate-x-[4px] -translate-y-1/2"></i>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                    {review.Image_Ratings?.length > 0 && (
                                        <div className="flex gap-3">
                                            {review.Image_Ratings.map((img, idx) => (
                                                <img key={img.id} src={`${process.env.REACT_APP_API_URL}${img.imageUrl}`} alt="review"
                                                    className="w-[70px] h-[70px] rounded-sm cursor-pointer"
                                                    onClick={() => {setShowMedia(review)
                                                        setCurrentSlideIndex(review.Video_Ratings.length + idx)
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="w-full h-32 flex items-center justify-center text-grayTextColor ">
                    Chưa có đánh giá nào
                </div>
            )
        )}
        { reviews.length > 0 && dataUserList.length > 0 && (
            <Pagination totalPages={totalPages} currentPage={currentPageIndex} onPageChange={handlePageChange} />
        )}
    </div>
    );
}
export default DataRatingProduct;
