export default function ProductPageSkeleton() {
  const Shimmer = ({ className }) => (
    <div
      className={`bg-skeletonBackground bg-[length:200%_100%] animate-shimmer ${className}`}
    ></div>
  );

  return (
    <div className="w-full bg-backgroundGrayColor h-auto min-h-screen pb-10">
      {/* 1. Breadcrumb Skeleton */}
      <div className="max-w-[1200px] mx-auto md:px-6 lg:px-0 flex gap-2 h-[56px] items-center px-2">
        <Shimmer className="h-3 w-12 rounded-sm" />
        <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
        <Shimmer className="h-3 w-20 rounded-sm" />
        <i className="fa-solid fa-chevron-right text-[10px] text-gray-300"></i>
        <Shimmer className="h-3 w-40 rounded-sm" />
      </div>
      {/* 2. Main Product Info Skeleton */}
      <div className="max-w-[1200px] w-full mx-auto p-2 md:p-4 flex bg-white rounded-sm gap-3 md:gap-6 lg:gap-[36px] h-auto flex-col md:flex-row">
        {/* Left Data Skeleton */}
        <div className="flex flex-col gap-4 w-full md:w-[450px]">
          <Shimmer className="aspect-square w-full rounded-sm" />
          <div className="flex gap-2 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <Shimmer
                key={i}
                className="aspect-square w-[82px] rounded-sm flex-shrink-0"
              />
            ))}
          </div>
        </div>

        {/* Right Data Skeleton */}
        <div className="flex flex-col flex-1 gap-4 pt-2">
          {/* Tên sản phẩm */}
          <Shimmer className="h-6 w-full rounded-sm" />

          {/* Rating, Reviews, Sold */}
          <div className="flex gap-4 items-center">
            <Shimmer className="h-4 w-24 rounded-sm" />
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <Shimmer className="h-4 w-24 rounded-sm" />
            <div className="h-4 w-[1px] bg-gray-200"></div>
            <Shimmer className="h-4 w-24 rounded-sm" />
          </div>
          {/* Giá */}
          <Shimmer className="h-16 w-full mt-4 rounded-sm !bg-gray-50" />
          {/* Các lựa chọn */}
          <div className="flex flex-col gap-6 mt-6">
            <div className="flex gap-4 items-center">
              <Shimmer className="h-4 w-24 rounded-sm" />
              <div className="flex flex-wrap gap-2 flex-1">
                {[...Array(3)].map((_, i) => (
                  <Shimmer
                    key={i}
                    className="h-10 w-24 rounded-sm border border-gray-100"
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Shimmer className="h-4 w-24 rounded-sm" />
              <div className="flex flex-wrap gap-2 flex-1">
                {[...Array(3)].map((_, i) => (
                  <Shimmer
                    key={i}
                    className="h-10 w-24 rounded-sm border border-gray-100"
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-4 items-center">
              <Shimmer className="h-4 w-24 rounded-sm" />
              <Shimmer className="h-8 w-32 rounded-sm border border-gray-200" />
            </div>
          </div>
          {/* Nút mua hàng */}
          <div className="flex gap-4 mt-8">
            <Shimmer className="h-12 w-48 rounded-sm" />
            <Shimmer className="h-12 w-48 rounded-sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
