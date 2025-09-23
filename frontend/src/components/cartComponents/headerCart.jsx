function HeaderCart({ isAllChecked, setIsAllChecked, isChangeFooter, setIsChangeFooter }) {
    return (
        <div className="grid [grid-template-columns:1fr_150px] md:[grid-template-columns:1fr_150px_150px_150px_150px] bg-white 
            h-10 md:h-[56px] max-w-[1200px] mx-auto border-b border-gray-200 pl-2 pr-3 md:px-10 grid items-center"
        >
            <div className='flex items-center h-full gap-4'>
                <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                    checked:bg-primaryColor checked:border-primaryColor"
                    checked={isAllChecked}
                    onChange={(e) => setIsAllChecked(e.target.checked)}
                />
                <div className='text-sm md:text-base'>
                    Sản Phẩm
                </div>
            </div>
            <div className='hidden md:flex justify-center capitalize text-grayTextColor'>đơn giá</div>
            <div className='hidden md:flex justify-center capitalize text-grayTextColor'>số lượng</div>
            <div className='hidden md:flex justify-center capitalize text-grayTextColor'>số tiền</div>
            <div className='hidden md:flex justify-center capitalize text-grayTextColor'>thao tác</div>
            <button className='md:hidden flex justify-end capitalize text-grayTextColor' 
                onClick={() => setIsChangeFooter(!isChangeFooter)}    
            >
                Sửa
            </button>
        </div>
    );
}
export default HeaderCart;