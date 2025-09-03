import { useState, useRef, useEffect } from 'react';
import { updateQuantityItem, removeItem } from '../../features/cart/cartSlice';
import { useDispatch } from 'react-redux';
import DetailProductDropDown from '../../components/cartComponents/detailProductDropDown'

function ProductList ({ cartItems, addToast, isAllChecked }) {
    const dispatch = useDispatch();
    // Dùng useState để lưu trạng thái dropdown cho từng sản phẩm
    const [openDropdown, setOpenDropdown] = useState(null);
    // Dùng useState để lưu trạng thái cho các input số lượng
    const [quantityInputs, setQuantityInputs] = useState(cartItems.map((item) => item.quantity.toString()));
    // Tạo ref để giữ timeout, mỗi popup một ref
    const popupIncreaseTimeout = useRef(null);
    const popupDecreaseTimeout = useRef(null);
    // Dùng useState để lưu isChecked của từng item
    const [isChecked, setIsChecked] = useState(cartItems.map(() => false));

    // Các hàm xử lí tăng, giảm số lượng; xóa sản phẩm rồi dùng dispatch(updateQuantityItem(id, quantity))
    // Hàm xử lí blur
    const handleQuantityClick = (e) => {
        const { action, id } = e.currentTarget.dataset;
        if (action === 'increase') {
            quantityIncrease(id);
        } else if (action === 'decrease') {
            quantityDecrease(id);
        }
    }

    const quantityIncrease = (index) => {
        const stock = cartItems[index].stock.find(
        attr => attr.attributeID === cartItems[index].selectedAttributes.attribute.id)?.count || 0;

        if (quantityInputs[index] >= stock) {
            // Clear timeout cũ
            if (popupIncreaseTimeout.current) clearTimeout(popupIncreaseTimeout.current);
            // Debounce popup
            popupIncreaseTimeout.current = setTimeout(() => {
                // Hiển thị popup thông báo cho việc tăng số lượng quá giới hạn
                addToast('Số lượng sản phẩm đã đạt giới hạn tối đa. Không thể tăng thêm.', 'error', 'warning');
            }, 400);
            return;
        }

        setQuantityInputs(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = (parseInt(newInputs[index]) + 1).toString();
            return newInputs;
        });

        // Clear timeout cũ
        if (popupIncreaseTimeout.current) clearTimeout(popupIncreaseTimeout.current);

        // Debounce popup
        popupIncreaseTimeout.current = setTimeout(() => {
            // Hiển thị popup thông báo cho việc cập nhật số lượng
            addToast('Số lượng sản phẩm đã được cập nhật.', 'success', 'check');
        }, 400);

        dispatch(updateQuantityItem({
            id: cartItems[index].selectedAttributes.attribute.id,
            quantity: parseInt(quantityInputs[index]) + 1
        }));
    };

    const quantityDecrease = (index) => {
        if (quantityInputs[index] <= 1) {
        if (popupDecreaseTimeout.current) clearTimeout(popupDecreaseTimeout.current);

        popupDecreaseTimeout.current = setTimeout(() => {
            // Hiển thị popup thông báo cho việc giảm số lượng quá 0
            addToast('Số lượng sản phẩm nhỏ nhất là 1. Không thể giảm thêm.', 'error', 'warning');
        }, 400);
        return;
        }

        setQuantityInputs(prevInputs => {
            const newInputs = [...prevInputs];
            newInputs[index] = (parseInt(newInputs[index]) - 1).toString();
            return newInputs;
        });

        if (popupDecreaseTimeout.current) clearTimeout(popupDecreaseTimeout.current);

        popupDecreaseTimeout.current = setTimeout(() => {
            // Hiển thị popup thông báo cho việc cập nhật số lượng
            addToast('Số lượng sản phẩm đã được cập nhật.', 'success', 'check');
        }, 400);

        dispatch(updateQuantityItem({
            id: cartItems[index].selectedAttributes.attribute.id,
            quantity: parseInt(quantityInputs[index]) - 1
        }));
    };

    const handleQuantityChange = (e, index) => {
        const newValue = e.target.value;
        setQuantityInputs(prev => {
            const updated = [...prev];
            updated[index] = newValue; 
            return updated;
        });
    };

    const handleBlur = (e, index) => {
        let value = quantityInputs[index];
        // Tính số lượng sản phẩm còn trong kho dựa trên selectedAttributes
        const stock = cartItems[index].stock.find(attr => attr.attributeID === cartItems[index].selectedAttributes.attribute.id)?.count || 0
        if ( parseInt(value) > 0 ) {
            if (parseInt(value) > stock) {
                setQuantityInputs(prev => {
                    const updated = [...prev];
                    updated[index] = stock.toString();
                    return updated;
                });
                dispatch(updateQuantityItem({ id: cartItems[index].selectedAttributes.attribute.id, quantity: stock }));
                // Hiển thị popup thông báo cho việc quá số lượng
                addToast('Số lượng sản phẩm vượt quá giới hạn trong kho. Đã tự động điều chỉnh về giá trị tối đa.', 'error', 'warning');
            } else {
                setQuantityInputs(prev => {
                    const updated = [...prev];
                    updated[index] = value;
                    return updated;
                });
                dispatch(updateQuantityItem({ id: cartItems[index].selectedAttributes.attribute.id, quantity: parseInt(value) }));
                // Hiển thị popup thông báo cho việc cập nhật số lượng
                addToast('Số lượng sản phẩm đã được cập nhật.', 'success', 'check');
            }
        }
    }

    // Hàm xử lí xóa sản phẩm bằng cách gọi dispatch(removeItem(id))
    const handleRemoveItem = (id) => {
        dispatch(removeItem(id));
        // Hiển thị popup thông báo cho việc xóa sản phẩm
        addToast('Sản phẩm đã được xóa khỏi giỏ hàng.', 'success', 'trash');
    };

    // Hàm xử lí Check một CheckBox
    const handleCheckboxChange = (index) => {
        setIsChecked(prev => {
            const updated = [...prev];
            updated[index] = !updated[index];
            return updated;
        });
    };

    // Dùng useEffect để đồng bộ trạng thái checkbox với isAllChecked
    useEffect(() => {
        if (isAllChecked) {
            setIsChecked(cartItems.map(() => true));
        } else {
            setIsChecked(cartItems.map(() => false));
        }
    }, [isAllChecked, cartItems]);

    return (
        cartItems.map((attribute, index) => (
            <div key={index} className="bg-white h-auto max-w-[1200px] mx-auto border-b border-gray-200 px-10 grid items-center mt-4"
                style={{ gridTemplateColumns: "1fr 150px 150px 150px 150px" }}
            >
            {/* Bên trái: checkbox, ảnh, tên, phân loại */}
                <div className='flex items-center h-full gap-4 my-[36px]'>
                    {/* Checkbox */}
                    <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                        checked:bg-[#FA5130] checked:border-[#FA5130]"
                        checked={isChecked[index]}
                        onChange={() => handleCheckboxChange(index)}
                    />
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
                        <DetailProductDropDown openDropdown={openDropdown} index={index} />
                    </div>
                </div>

                {/* Bên phải: 4 thông tin sản phẩm */}
                {/* Đơn giá */}
                <div className='flex justify-center text-sm font-normal gap-2'>
                    { attribute.discount > 0 && (
                        <div className='relative text-[#929292] whitespace-nowrap'>
                        <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                        { attribute.selectedAttributes.attribute.price.toLocaleString('vi-VN') }
                        <div className='absolute top-[50%] right-0 w-full h-[1px] bg-black'></div>
                        </div>
                    )}
                    <div className='whitespace-nowrap'>
                        <i className="fa-solid fa-dong-sign text-[10px] relative top-[-4px]"></i>
                        {(attribute.selectedAttributes.attribute.price * (100 - 10) / 100).toLocaleString('vi-VN')}
                    </div>
                </div>
                {/* Số lượng */}
                <div className='flex justify-center items-center h-8  text-inherit w-full'>
                    <button className={`w-[30px] h-full flex items-center justify-center
                        border border-[#CCCCCC] text-xs
                        `}
                        onClick={handleQuantityClick}
                        data-action="decrease"
                        data-id={index}
                    >
                        <i className="fa-solid fa-minus"></i>
                    </button>
                    <input
                        type="number"
                        min="1"
                        value={quantityInputs[index]}
                        onChange={e => handleQuantityChange(e, index)}
                        onBlur={e => handleBlur(e, index)}
                        onKeyDown={(e) => {
                        if (
                            !(
                            (e.key >= '0' && e.key <= '9') || 
                            ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab'].includes(e.key)
                            )
                        ) {
                            e.preventDefault();
                        }
                        }}
                        className={`flex-1 h-full text-center [appearance:textfield] max-w-[50px]
                        [&::-webkit-outer-spin-button]:appearance-none 
                        [&::-webkit-inner-spin-button]:appearance-none
                        focus:outline-none
                        bg-transparent
                        border-y border-[#CCCCCC]
                        `}
                    />
                    <button className={`w-[30px] h-full flex items-center justify-center
                        border border-[#CCCCCC] text-xs
                        `}
                        onClick={handleQuantityClick}
                        data-action="increase"
                        data-id={index}
                    >
                        <i className="fa-solid fa-plus"></i>
                    </button>
                </div>
                {/* Số tiền */}
                <div className='flex justify-center text-sm font-normal text-[#ee4d2d]'>
                    <i className="fa-solid fa-dong-sign text-[10px] relative top-[7px] right-[1px]"></i>
                    {(attribute.quantity * (attribute.selectedAttributes.attribute.price * (100 - 10) / 100)).toLocaleString('vi-VN')}
                </div>
                {/* Thao tác */}
                <button className='flex justify-center text-sm font-normal'
                    onClick={() => handleRemoveItem(attribute.selectedAttributes.attribute.id)}
                >
                    Xóa
                </button>
            </div>
        ))
    )
}

export default ProductList;