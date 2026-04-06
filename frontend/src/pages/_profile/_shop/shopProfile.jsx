import clsx from "clsx";
import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  useGetShopQuery,
  useIsFollowShopQuery,
  useFollowShopMutation,
  useUnfollowShopMutation,
} from "../../../features/api/shopQuery";
import StackBar from "../../../components/StackBar";
import useToastQueue from "../../../hooks/useToastQueue";

export default function ShopProfile() {
  const { shopId } = useParams();
  const { toasts, addToast } = useToastQueue(3, 1500);

  const {
    data: shopData,
    isLoading,
    isError,
  } = useGetShopQuery(shopId, { refetchOnMountOrArgChange: true });
  const { data: isFollow } = useIsFollowShopQuery(shopId, {
    skip: !shopId,
    refetchOnMountOrArgChange: true,
  });
  const [isFollowing, setIsFollowing] = useState(isFollow);
  const [followShop] = useFollowShopMutation();
  const [unfollowShop] = useUnfollowShopMutation();
  const optimisticFollowingRef = useRef(isFollow);
  const timerRef = useRef(null);
  const onlineStatus = "17 phút trước";

  const handleFollow = () => {
    const nextFollowingState = !optimisticFollowingRef.current;
    optimisticFollowingRef.current = nextFollowingState;

    setIsFollowing(nextFollowingState);

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(async () => {
      if (optimisticFollowingRef.current === isFollow) return;

      try {
        if (optimisticFollowingRef.current) {
          await followShop(shopId).unwrap();
          addToast("Đã theo dõi cửa hàng!", "success", "check");
        } else {
          await unfollowShop(shopId).unwrap();
          addToast("Đã bỏ theo dõi cửa hàng!", "success", "check");
        }
      } catch (error) {
        addToast("Có lỗi xảy ra khi theo dõi cửa hàng!", "error", "warning");
        setIsFollowing(isFollow);
        optimisticFollowingRef.current = isFollow;
      }
    }, 500);
  };

  return (
    <div className={clsx("w-full  border-b border-lessgrayColor")}>
      <StackBar toasts={toasts} width={"300px"} height={"100px"} />
      {shopData && (
        <div
          className={clsx(
            "flex flex-col md:flex-row items-start justify-start bg-white gap-2 md:gap-8 max-w-[1200px] mx-auto",
            "rounded-sm py-4 md:py-6 px-4 lg:px-0",
          )}
        >
          {/* CỘT TRÁI: THÔNG TIN SHOP (Profile Card) */}
          <div
            className={clsx(
              "relative w-full md:w-[390px] min-h-[135px] bg-primaryColor p-4",
              "flex flex-col justify-between rounded-sm overflow-hidden",
            )}
          >
            {/* Lớp overlay mờ phía sau để giống ảnh gốc (tùy chọn) */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />
            <div className="relative z-10 flex flex-col gap-2 items-start justify-start">
              {/* Avatar */}
              <div className="flex items-start justify-start gap-2">
                <div className="w-20 h-20 border-4 border-white/30 rounded-full overflow-hidden">
                  <img
                    src="https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"
                    alt="Avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-start">
                  <h1 className="text-lg text-base text-white font-normal truncate w-[200px]">
                    {shopData.nameShop}
                  </h1>
                  <p className="text-xs opacity-80 text-lesslessgrayColor">
                    Online {onlineStatus}
                  </p>
                </div>
              </div>
              {/* Nút bấm */}
              <div className="w-full flex items-start justify-start gap-2 text-white">
                <button
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1 md:gap-2 px-3 py-1",
                    "border border-white rounded-sm text-sm hover:bg-white/10 transition-all",
                  )}
                  onClick={handleFollow}
                >
                  {isFollowing ? (
                    <i className="fa-solid fa-check"></i>
                  ) : (
                    <i className="fa-solid fa-plus"></i>
                  )}
                  {isFollowing ? "Đang Theo Dõi" : "Theo Dõi"}
                </button>
                <button
                  className={clsx(
                    "flex flex-1 items-center justify-center gap-1 md:gap-2 px-3 py-1",
                    "border border-white rounded-sm text-sm hover:bg-white/10 transition-all",
                  )}
                >
                  <i className="fa-regular fa-comment-dots"></i>Chat
                </button>
              </div>
            </div>
          </div>
          {/* CỘT PHẢI: THÔNG SỐ (Stats) */}
          <div className="w-full flex-1 grid grid-cols-2 gap-y-4 gap-x-4 self-start py-2">
            {/* Mục: Sản phẩm */}
            <div className="flex items-center justify-start gap-2 text-sm">
              <i className="fa-solid fa-boxes-packing text-grayTextColor"></i>
              <span className="text-black/70 capitalize">Sản Phẩm:</span>
              <span className="text-primaryColor font-medium">
                {shopData.productCount}
              </span>
            </div>
            {/* Mục: Người theo dõi */}
            <div className="justify-self-end md:justify-self-start flex items-center justify-start gap-2 text-sm">
              <i className="fa-solid fa-user-group text-grayTextColor"></i>
              <span className="text-black/70 capitalize">Người Theo Dõi:</span>
              <span className="text-primaryColor font-medium">
                {shopData.followerCount}
              </span>
            </div>
            {/* Mục: Đang theo dõi */}
            <div className="flex items-center justify-start gap-2 text-sm">
              <i className="fa-solid fa-user-plus text-grayTextColor"></i>
              <span className="text-black/70 capitalize">Đang Theo:</span>
              <span className="text-primaryColor font-medium">
                {shopData.followingCount}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
