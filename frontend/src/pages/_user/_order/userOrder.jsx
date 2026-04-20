import clsx from 'clsx';
import { useState, useRef, useCallback, useEffect } from 'react';
import {
  useLazyGetListOrderItemsWithDetailsQuery,
  useGetListOrderItemsWithDetailsQuery,
} from '../../../features/api/orderQuery';
import OrderItemCard from '../../../components/orderComponents/orderItemCard';
import Spinner from '../../../components/skeletons/spinnerButton';

export default function UserOrder() {
  const [activeTab, setActiveTab] = useState('ALL');

  const [orderItems, setOrderItems] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const { data, isFetching } = useGetListOrderItemsWithDetailsQuery({
    statusFilter: activeTab,
    cursor: null,
  });

  const [triggerGetMore, { isFetching: isFetchingMore }] =
    useLazyGetListOrderItemsWithDetailsQuery();

  // Cập nhật data ban đầu mỗi khi đổi tab hoặc fetch xong lần đầu
  useEffect(() => {
    if (data?.data) {
      setOrderItems(data.data);
      setCursor(data.pagination.nextCursor || null);
      setHasMore(data.pagination.hasNextPage);
    }
  }, [data]);

  const tabs = [
    { id: 'ALL', label: 'Tất cả' },
    { id: 'PENDING', label: 'Chờ thanh toán' },
    { id: 'PAID', label: 'Đã thanh toán' },
    { id: 'FAILED', label: 'Đã hủy' },
  ];
  const activeIndex = tabs.findIndex((tab) => tab.id === activeTab);

  const handleLoadMore = useCallback(async () => {
    if (!cursor || isFetchingMore) return;
    try {
      const res = await triggerGetMore({
        statusFilter: activeTab,
        cursor: cursor,
      }).unwrap();

      if (res?.data) {
        setOrderItems((prev) => [...prev, ...res.data]);
        setCursor(res.pagination.nextCursor || null);
        setHasMore(res.pagination.hasNextPage);
      }
    } catch (err) {
      console.error('Lỗi tải thêm đơn hàng:', err);
    }
  }, [cursor, activeTab, triggerGetMore, isFetchingMore]);

  const observerRef = useRef();
  const loadMoreRef = useCallback(
    (node) => {
      if (isFetching || isFetchingMore) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          handleLoadMore();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetching, isFetchingMore, hasMore, handleLoadMore]
  );

  const handleSetStatusFilter = (statusFilter) => {
    if (activeTab === statusFilter) return;
    // Reset
    setOrderItems([]);
    setCursor(null);
    setHasMore(true);
    setActiveTab(statusFilter);
  };

  return (
    <div
      className={clsx('w-full flex flex-col items-center justify-start gap-2')}
    >
      {/* Tab */}
      <div
        className={clsx(
          'w-full h-14 flex items-start justify-start relative',
          'bg-white mt-4 rounded-sm shadow-sm select-none'
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSetStatusFilter(tab.id)}
            className={clsx(
              'flex items-center justify-center h-14 w-40 px-4 py-2 text-lg font-normal z-10 transition-colors duration-200',
              activeTab === tab.id
                ? 'text-primaryColor'
                : 'text-black hover:text-primaryColor'
            )}
          >
            {tab.label}
          </button>
        ))}
        <div
          className="absolute bottom-0 left-0 h-[2px] w-40 bg-primaryColor transition-transform duration-300 ease-in-out"
          style={{
            transform: `translateX(${activeIndex * 100}%)`,
          }}
        />
      </div>
      {/* List Order */}
      {isFetching ? (
        <div className="w-full flex justify-center items-center py-2 h-10">
          <Spinner size={30} color="#ee4d2d" stroke={5} _hidden="" />
        </div>
      ) : orderItems.length > 0 ? (
        <>
          {orderItems.map((order) => (
            <OrderItemCard
              key={`${order.orderId}-${order.shopId}`}
              order={order}
            />
          ))}
          <div
            ref={loadMoreRef}
            className="w-full h-10 flex items-center justify-center mt-4"
          >
            {isFetchingMore && (
              <div className="w-full flex justify-center items-center py-2 h-10">
                <Spinner size={30} color="#ee4d2d" stroke={5} _hidden="" />
              </div>
            )}
            {!hasMore && (
              <div
                className={clsx('w-full p-2 text-center text-primaryTextColor')}
              >
                Bạn đã xem hết đơn hàng!
              </div>
            )}
          </div>
        </>
      ) : data?.data?.length === 0 ? (
        // Cập nhật: Chỉ hiện dòng này nếu chính xác data trả về từ cache/api là rỗng
        <div
          className={clsx(
            'w-full flex flex-col items-center justify-start gap-2 mt-4'
          )}
        >
          <p>Không có đơn hàng!</p>
        </div>
      ) : (
        <div className="w-full flex justify-center items-center py-2 h-10">
          <Spinner size={30} color="#ee4d2d" stroke={5} _hidden="" />
        </div>
      )}
    </div>
  );
}
