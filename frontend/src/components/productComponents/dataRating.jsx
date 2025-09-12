import { useEffect, useState } from "react";
import { getProductReviews } from "../../services/product.service";

function DataRatingProduct({ product, rating, numReviews }) {
    const [reviews, setReviews] = useState([]);

    const fetchReviews = async (id, limit, page) => {
        try {
            const response = await getProductReviews(id, limit, page);
            setReviews(response.data.rows);
        } catch (error) {
            console.error("Lỗi khi lấy đánh giá sản phẩm:", error);
        }
    };

    useEffect(() => {
        if (product) {
            fetchReviews(product.id, 6, 1);
        }
    }, [product]);
    console.log(reviews);
    return (
        <div className="max-w-[1200px] h-auto mx-auto bg-white mt-6 p-6 rounded-sm ">
            <h1 className="capitalize bg-gray-50 h-14 flex items-center px-4 rounded-sm text-xl">
                Đánh giá sản phẩm
            </h1>
            <div className="w-full h-32 flex px-6 bg-primaryRatingColor mt-5 rounded-sm border border-primaryBorderRating">
                <div className='relative h-full flex flex-col gap-2 justify-center items-center'>
                    <div className='flex gap-1 items-end text-primaryColor text-4xl'>
                        {rating}
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
                <div>

                </div>
            </div>
            <div className="flex flex-col gap-4 ">
                { reviews.map((review) => (
                    <div key={review.id} className="w-full h-auto flex pb-14 border-b border-gray-300">
                        {/* Avatar */}
                        <div className="w-20"></div>
                        {/* Hiển thị thông tin bình luận */}
                        <div className="flex flex-col flex-1 gap-3">
                            <div className=""></div>
                            <div className="">{review.comment}</div>
                            <div className="flex gap-3">
                                {review.Image_Ratings.length > 0 && (
                                    <div className="flex gap-3">
                                        {review.Image_Ratings.map((img, idx) => (
                                        <img key={idx} src={`${process.env.REACT_APP_API_URL}${img.imageUrl}`} alt="review"
                                            className="w-[70px] h-[70px] rounded-sm"
                                        />
                                        ))}
                                    </div>
                                )}
                                {review.Video_Ratings.length > 0 && (
                                    <div className="flex gap-3">
                                        {review.Video_Ratings.map((video, idx) => (
                                        <video key={idx} controls className="w-[70px] h-[70px] rounded-sm"
                                            src={`${process.env.REACT_APP_API_URL}${video.videoUrl}`}
                                        />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default DataRatingProduct;
