import clsx from "clsx";

const ShopSkeleton = () => {
  const skeletonClass =
    "bg-[length:200%_100%] bg-skeletonBackground animate-shimmer";

  return (
    <div className="w-full border-b border-lessgrayColor h-screen">
      <div
        className={clsx(
          "flex flex-col md:flex-row items-start justify-start bg-white gap-2 md:gap-8 max-w-[1200px] mx-auto",
          "rounded-sm py-4 md:py-6 px-4 lg:px-0",
        )}
      >
        {/* CỘT TRÁI: Profile Card Skeleton */}
        <div
          className={clsx(
            "relative w-full md:w-[390px] min-h-[135px] bg-primaryColor p-4",
            "flex flex-col justify-between rounded-sm overflow-hidden",
          )}
        >
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          <div className="relative z-10 flex flex-col gap-2 items-start justify-start">
            {/* Avatar & Name */}
            <div className="flex items-start justify-start gap-2">
              {/* Avatar Circle */}
              <div className="w-20 h-20 border-4 border-white/30 rounded-full overflow-hidden">
                <div className={clsx("w-full h-full", skeletonClass)} />
              </div>

              <div className="flex flex-col items-start justify-start gap-2 mt-2">
                {/* Name line */}
                <div className={clsx("h-5 w-32 rounded-sm", skeletonClass)} />
                {/* Status line */}
                <div
                  className={clsx(
                    "h-3 w-20 rounded-sm opacity-50",
                    skeletonClass,
                  )}
                />
              </div>
            </div>
            {/* Buttons Skeleton */}
            <div className="w-full flex items-start justify-start gap-2">
              <div
                className={clsx(
                  "flex-1 h-7 rounded-sm border border-white/20",
                  skeletonClass,
                )}
              />
              <div
                className={clsx(
                  "flex-1 h-7 rounded-sm border border-white/20",
                  skeletonClass,
                )}
              />
            </div>
          </div>
        </div>
        {/* CỘT PHẢI: Stats Skeleton */}
        <div className="w-full flex-1 grid grid-cols-2 gap-y-4 gap-x-4 self-start py-2">
          {/* Mục: Sản phẩm */}
          <div className="flex items-center justify-start gap-2 text-sm">
            <i className="fa-solid fa-boxes-packing text-grayTextColor"></i>
            <span className="text-black/70 capitalize">Sản Phẩm:</span>
            <div className={clsx("h-4 w-8 rounded-sm", skeletonClass)} />
          </div>
          {/* Mục: Người theo dõi */}
          <div className="justify-self-end md:justify-self-start flex items-center justify-start gap-2 text-sm">
            <i className="fa-solid fa-user-group text-grayTextColor"></i>
            <span className="text-black/70 capitalize">Người Theo Dõi:</span>
            <div className={clsx("h-4 w-8 rounded-sm", skeletonClass)} />
          </div>
          {/* Mục: Đang theo dõi */}
          <div className="flex items-center justify-start gap-2 text-sm">
            <i className="fa-solid fa-user-plus text-grayTextColor"></i>
            <span className="text-black/70 capitalize">Đang Theo:</span>
            <div className={clsx("h-4 w-8 rounded-sm", skeletonClass)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSkeleton;
