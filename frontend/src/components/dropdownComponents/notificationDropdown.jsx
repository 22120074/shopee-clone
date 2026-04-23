import '../../css/header.css';
import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userImageUrlFormat } from '../../utils/stringFormat';
import { useSelector } from 'react-redux';
import NotificationContent from '../others/notificationContent';
import Spinner from '../skeletons/spinnerButton';
import {
  useMarkAsReadMutation,
  useLazyGetNotificationsQuery,
  useGetFirstTimeNotificationsQuery,
  useMarkAllAsReadMutation,
} from '../../features/api/notificationQuery';

export default function NotificationDropdown({
  openNotificationDropdown,
  setOpenNotificationDropdown,
}) {
  const navigate = useNavigate();

  const isOpen = openNotificationDropdown === 'open';

  const user = useSelector((state) => state.auth.currentUser);
  const notifications = useSelector((state) => state.notification.list);
  const unreadCount = useSelector((state) => state.notification.unreadCount);
  const nextCursor = useSelector((state) => state.notification.nextCursor);
  const hasNextPage = useSelector((state) => state.notification.hasNextPage);

  const [markAsRead] = useMarkAsReadMutation();
  const [markAllAsRead] = useMarkAllAsReadMutation();
  useGetFirstTimeNotificationsQuery(
    { limit: 5 },
    {
      skip: !user,
    }
  );

  const [triggerGetNotifications, { isLoading, isFetching }] =
    useLazyGetNotificationsQuery();

  const observerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          hasNextPage &&
          isOpen &&
          !isLoading &&
          !isFetching &&
          nextCursor
        ) {
          triggerGetNotifications({
            limit: 5,
            cursor: nextCursor,
          });
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentTarget = observerRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [
    hasNextPage,
    isLoading,
    isFetching,
    isOpen,
    nextCursor,
    triggerGetNotifications,
  ]);

  const handleClick = async (type, notification) => {
    try {
      setOpenNotificationDropdown('close');
      markAsRead(notification.id).unwrap();
      if (type === 'NEW_PRODUCT') {
        navigate(`/product/${JSON.parse(notification.content).id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      if (unreadCount === 0) return;
      await markAllAsRead().unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`notification_dropdown absolute ${openNotificationDropdown}`}
    >
      <div className="w-full flex items-center justify-between p-2">
        <h1 className="text-grayTextColor capitalize text-md font-normal">
          Thông báo mới nhận
        </h1>
        <button
          className="text-primaryColor text-sm font-normal"
          onClick={() => handleMarkAllAsRead()}
        >
          Đánh dấu tất cả đã đọc
        </button>
      </div>
      {/* Notification List Container */}
      <div
        className={clsx(
          'w-full flex flex-col items-start justify-start',
          'min-h-[400px] max-h-[500px] overflow-y-auto overflow-x-hidden'
        )}
      >
        {notifications?.length === 0 ? (
          <div className="w-full p-2 text-center text-grayTextColor">
            Không có thông báo mới
          </div>
        ) : (
          notifications.map((notification, index) => (
            <div
              key={index}
              className={clsx(
                'w-full p-2 flex items-start justify-start gap-2 cursor-pointer',
                notification.isRead ? 'bg-white' : 'bg-notificationBg',
                'hover:bg-primaryRatingColor'
              )}
              onClick={() => handleClick(notification.type, notification)}
            >
              {/* Image Preview */}
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={
                    userImageUrlFormat(notification?.avatarUrl) ||
                    'https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg'
                  }
                  alt="avatar"
                  className="user_avatar w-10 h-10 object-cover"
                />
              </div>
              {/* Notification Content */}
              <NotificationContent notification={notification} />
            </div>
          ))
        )}
        {hasNextPage === false && notifications?.length > 0 && (
          <div className={clsx('w-full p-2 text-center text-primaryTextColor')}>
            Đã tải hết thông báo!
          </div>
        )}
        {/* Loading Spinner & Observer Target */}
        {(isLoading || isFetching) && (
          <div className="w-full flex justify-center items-center py-2 h-10">
            <Spinner size={30} color="#ee4d2d" stroke={3} _hidden="" />
          </div>
        )}
        {hasNextPage && <div ref={observerRef} className="h-1" />}
      </div>
    </div>
  );
}
