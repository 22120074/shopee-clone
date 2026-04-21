import clsx from 'clsx';
import NormalButton from '../buttons/NormalButton';
import PrimaryButton from '../buttons/Button';
import { getOrderStatus } from '../../utils/stringFormat';

export default function OrderItemCard({ order }) {
  return (
    <div
      className={clsx(
        'w-full flex flex-col items-center justify-start bg-white relative'
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          'w-full flex flex-col items-center justify-start p-4 bg-white relative',
          'border-b border-dashed border-lessgrayColor'
        )}
      >
        {/* Shop & Status */}
        <div className={clsx('w-full flex items-center justify-between mb-4')}>
          <div className={clsx('flex items-center gap-2 text-sm')}>
            <i className="fa-solid fa-shop"></i>
            <p
              className={clsx(
                'font-medium hover:text-primaryColor',
                'cursor-pointer sm:cursor-default sm:pointer-events-none'
              )}
              onClick={() =>
                (window.location.href = `/profile/shop/${order.shopId}`)
              }
            >
              {order.shopName}
            </p>
            <NormalButton
              text="Xem Shop"
              typeSort="a"
              sortOption="b"
              onClick={() =>
                (window.location.href = `/profile/shop/${order.shopId}`)
              }
              icon={<i className="fa-solid fa-shop mr-2 text-xs" />}
              className="!border-lessgrayColor text-xs p-1 text-grayTextColor !hidden md:!flex"
            />
          </div>
          <p className={clsx('text-primaryColor uppercase select-none')}>
            {getOrderStatus(order.orderStatus)}
          </p>
        </div>
        {/* Content */}
        {order.items.map((item) => (
          <div
            key={item.orderItemId}
            className={clsx(
              'w-full flex items-start md:items-center justify-start gap-4 py-2 relative',
              'border-t border-lessgrayColor'
            )}
          >
            {/* Image */}
            <img
              src={`${item.attribute.imageUrl}`}
              alt="Product"
              className={clsx(
                'w-20 h-20 object-cover border border-lessgrayColor rounded-sm flex-shrink-0'
              )}
            />
            {/* Name & Attribute & Quantity */}
            <div className={clsx('hidden flex-1 md:flex flex-col min-w-0')}>
              <h3
                className={clsx(
                  'text-base leading-snug text-black line-clamp-2 max-w-[600px]'
                )}
              >
                {item.favorite && (
                  <span
                    className={clsx(
                      'inline-block text-white text-[11px] bg-primaryTextColor',
                      'leading-[14px] px-1 rounded-[3px] mr-1 relative top-[-2px]'
                    )}
                  >
                    Yêu thích
                  </span>
                )}
                {item.productName}
              </h3>
              <p className={clsx('text-sm text-gray-500 mt-1')}>
                Phân loại hàng: {item.attribute.nameEach}
                {item.attribute.size && <>, {item.attribute.size}</>}
              </p>
              <span className={clsx('text-base text-black font-normal')}>
                x{item.quantity}
              </span>
            </div>
            {/* Price Each*/}
            <div className="hidden md:flex justify-center text-sm font-normal gap-2 max-w-[150px]">
              {item.discount > 0 && (
                <div className="relative text-grayTextColor whitespace-nowrap text-base">
                  {item.attribute.price.toLocaleString('vi-VN')}
                  <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                  <div className="absolute top-[50%] right-0 w-full h-[1px] bg-grayTextColor"></div>
                </div>
              )}
              <div className="whitespace-nowrap text-base text-primaryTextColor">
                <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                {(
                  (item.attribute.price * (100 - (item.discount || 0))) /
                  100
                ).toLocaleString('vi-VN')}
              </div>
            </div>
            {/* Mobile Layout */}
            <div
              className={clsx(
                'flex flex-col md:hidden w-full items-start gap-2'
              )}
            >
              {/* Name & Attribute */}
              <div className={clsx('flex-1 flex flex-col min-w-0')}>
                <h3
                  className={clsx(
                    'text-sm leading-snug text-black line-clamp-2 max-w-[600px]'
                  )}
                >
                  {item.favorite && (
                    <span
                      className={clsx(
                        'inline-block text-white text-[11px] bg-primaryTextColor',
                        'leading-[14px] px-1 rounded-[3px] mr-1 relative top-[-2px]'
                      )}
                    >
                      Yêu thích
                    </span>
                  )}
                  {item.productName}
                </h3>
                <p className={clsx('text-xs text-gray-500 mt-1')}>
                  Phân loại hàng: {item.attribute.nameEach}
                  {item.attribute.size && <>, {item.attribute.size}</>}
                </p>
              </div>
              {/* Price Each & Quantity */}
              <div className="flex items-center justify-between font-normal w-full">
                <span className={clsx('text-base text-black')}>
                  x{item.quantity}
                </span>
                {/* Price Each*/}
                <div className="flex items-center justify-end gap-2">
                  {item.discount > 0 && (
                    <div className="relative text-grayTextColor whitespace-nowrap text-base">
                      {item.attribute.price.toLocaleString('vi-VN')}
                      <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                      <div className="absolute top-[50%] right-0 w-full h-[1px] bg-grayTextColor"></div>
                    </div>
                  )}
                  <div className="whitespace-nowrap text-base text-primaryTextColor">
                    <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                    {(
                      (item.attribute.price * (100 - (item.discount || 0))) /
                      100
                    ).toLocaleString('vi-VN')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Two Half Circles Bottom */}
        <div className="absolute w-3 h-3 rounded-full bg-backgroundGrayColor bottom-0 left-0 translate-x-[-50%] translate-y-[50%]" />
        <div className="absolute w-3 h-3 rounded-full bg-backgroundGrayColor bottom-0 right-0 translate-x-[50%] translate-y-[50%]" />
      </div>
      {/* Footer: Total Price & Buttons */}
      <div
        className={clsx(
          'w-full flex flex-col items-center justify-start pt-2 pb-4 px-4 md:p-4 bg-white relative gap-2 md:gap-4 shadow-sm'
        )}
      >
        {/* Two Half Circles Top */}
        <div className="absolute w-3 h-3 rounded-full bg-backgroundGrayColor top-0 left-0 translate-x-[-50%] translate-y-[-50%]" />
        <div className="absolute w-3 h-3 rounded-full bg-backgroundGrayColor top-0 right-0 translate-x-[50%] translate-y-[-50%]" />
        {/* Total Price */}
        <div
          className={clsx(
            'w-full flex items-center justify-end gap-2',
            'text-2xl font-normal'
          )}
        >
          <h1 className={clsx('text-base')}>Thành tiền:</h1>
          <div className="flex justify-center text-primaryTextColor max-w-[150px]">
            <i className="fa-solid fa-dong-sign text-[10px] relative top-[7px] right-[1px]"></i>
            {order.items
              .reduce((total, item) => {
                const priceSauGiam =
                  (item.attribute.price * (100 - (item.discount || 0))) / 100;
                return total + priceSauGiam * item.quantity;
              }, 0)
              .toLocaleString('vi-VN')}
          </div>
        </div>
        {/* Buttons */}
        <div className={clsx('w-full flex items-center justify-end gap-2')}>
          <PrimaryButton
            text="Mua lại"
            onClick={() => window.alert('Chức năng này chưa có!')}
          />
          <NormalButton
            text="Liên hệ người bán"
            typeSort="a"
            sortOption="b"
            onClick={() => window.alert('Chức năng này chưa có!')}
            className="!border-lessgrayColor !py-2 !text-grayTextColor"
          />
        </div>
      </div>
    </div>
  );
}
