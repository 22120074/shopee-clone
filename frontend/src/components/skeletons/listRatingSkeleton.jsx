import { Link } from "react-router-dom";

export default function ListRatingSkeleton() {

    return (
    <div className="flex flex-col gap-4 w-full mt-4">
        {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-full h-auto grid grid-cols-[50px_1fr] pb-14 border-b border-gray-300 p-3">
                {/* Avatar */}
                <Link to="/user" className="flex items-start justify-center gap-2"> 
                    <div className='w-[32px] h-[32px] rounded-full overflow-hidden bg-skeletonBackground bg-[length:200%_100%] animate-shimmer'>
                    </div>
                </Link>
                {/* Hiển thị thông tin bình luận */}
                <div className="flex flex-col flex-1 gap-4">
                    {/* Phần tên, điểm, ngày giờ đánh giá */}
                    <div className="flex flex-col items-start justify-start text-xs gap-2">
                        <div className="h-2 w-32 rounded-sm bg-skeletonBackground bg-[length:200%_100%] animate-shimmer">
                        </div>
                        <div className='h-2 w-20 rounded-sm bg-skeletonBackground bg-[length:200%_100%] animate-shimmer'>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="h-2 w-20 rounded-sm bg-skeletonBackground bg-[length:200%_100%] animate-shimmer"></div>
                            <div className="flex h-4 w-0 border border-gray-300"></div>
                            <div className="flex items-center gap-2">Phân loại hàng: <div className='h-2 w-20 rounded-sm bg-skeletonBackground bg-[length:200%_100%] animate-shimmer'></div></div>
                        </div>
                    </div>
                    {/* Phần nội dung bình luận */}
                    <div className="h-4 w-[60%] rounded-sm bg-skeletonBackground bg-[length:200%_100%] animate-shimmer"></div>
                </div>
            </div>
        ))}
    </div>
    )
}