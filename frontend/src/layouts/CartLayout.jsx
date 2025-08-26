import '../css/CartLayout.css'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import PrimaryButton from '../components/Button';


function CartLayout() {
  const cartItems = useSelector((state) => state.cart.items);

  const [openDropdown, setOpenDropdown] = useState(null);



  return (
    <div className="w-full bg-[#F5F5F5] h-screen pt-5">
        {/* Thanh ngang phân cột trong giỏ hàng */}
        <div className="bg-white h-[56px] max-w-[1200px] mx-auto border-b border-gray-200 px-10 flex items-center justify-between">
          <div className='flex items-center h-full gap-4'>
            <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
              checked:bg-[#FA5130] checked:border-[#FA5130]">
            </input>
            <div className=''>
              Sản Phẩm
            </div>
          </div>
          <ul className='flex items-center h-full gap-24'> 
            <li className='capitalize text-[#888897]'>đơn giá</li>
            <li className='capitalize text-[#888897]'>số lượng</li>
            <li className='capitalize text-[#888897]'>số tiền</li>
            <li className='capitalize text-[#888897]'>thao tác</li>
          </ul>
        </div>
        {/* Nội dung giỏ hàng sẽ được hiển thị ở đây */}
        {
          cartItems.map((attribute, index) => (
            <div key={index} className="bg-white h-auto max-w-[1200px] mx-auto border-b border-gray-200 px-10 flex items-center justify-between mt-4">
              {/* Bên trái: checkbox, ảnh, tên, phân loại */}
              <div className='flex items-center h-full gap-4 my-[36px]'>

                {/* Checkbox */}
                <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                  checked:bg-[#FA5130] checked:border-[#FA5130]">
                </input>

                {/* Ảnh và tên sản phẩm */}
                <div className='flex items-center h-full gap-2'>
                  {/* Ảnh sản phẩm */}
                  <div className='rounded-sm'
                    style={{
                        width: '80px',
                        height: '80px',
                        backgroundImage: `url(${attribute.selectedAttributes.attribute.imageUrl})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center'
                    }}>
                  </div>
                  {/* Tên sản phẩm */}
                  <div className="flex items-start h-[80px]">
                    <div className="w-[200px] line-clamp-2 text-sm font-normal text-start">
                      {attribute.name}
                    </div>
                  </div>
                </div>

                {/* Phân loại sản phẩm */}
                <div className='relative'>
                    <div className='text-sm capitalize text-[#0000008a] font-medium flex gap-2'>
                      phân loại hàng: 
                      <button className='inline-block' onClick={() => setOpenDropdown(openDropdown === index ? null : index)}>
                        <i className={`fa-solid fa-caret-down text-sm transition-transform duration-100 
                          ${openDropdown === index ? 'rotate-180' : 'rotate-0'}`}>
                        </i>
                      </button>
                    </div>
                    <div className='text-sm capitalize text-[#0000008a] w-[140px] whitespace-normal'>
                      {attribute.selectedAttributes.color}, {attribute.selectedAttributes.size}
                    </div>
                    {/* Phần dropdown */}
                    <div className={`absolute top-full right-0 w-[140px] bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-10 
                        selectedProduct_dropdown ${openDropdown === index ? 'block' : 'hidden'}`}>
                      <PrimaryButton className='w-full'>Chọn</PrimaryButton>
                    </div>
                </div>
              </div>

              {/* Bên phải: 4 thông tin sản phẩm */}
              <ul className='flex items-center justify-center h-full gap-24'> 
                <li className=''>{attribute.selectedAttributes.attribute.price}</li>
                <li className=''>{attribute.quantity}</li>
                <li className=''>{attribute.quantity * attribute.selectedAttributes.attribute.price}</li>
                <li className=''>Xóa</li>
              </ul>
            </div>
          ))
        }
    </div>
  );
}

export default CartLayout;
