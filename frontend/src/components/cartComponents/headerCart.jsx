function HeaderCart({ isAllChecked, setIsAllChecked }) {
    return (
        <div className="bg-white h-[56px] max-w-[1200px] mx-auto border-b border-gray-200 px-10 grid items-center"
            style={{ gridTemplateColumns: "1fr 150px 150px 150px 150px" }}
        >
            <div className='flex items-center h-full gap-4'>
                <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                    checked:bg-primaryColor checked:border-primaryColor"
                    checked={isAllChecked}
                    onChange={(e) => setIsAllChecked(e.target.checked)}
                />
                <div className=''>
                    Sản Phẩm
                </div>
            </div>
            <div className='flex justify-center capitalize text-grayTextColor'>đơn giá</div>
            <div className='flex justify-center capitalize text-grayTextColor'>số lượng</div>
            <div className='flex justify-center capitalize text-grayTextColor'>số tiền</div>
            <div className='flex justify-center capitalize text-grayTextColor'>thao tác</div>
        </div>
    );
}
export default HeaderCart;