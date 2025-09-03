function HeaderCart() {
    return (
        <div className="bg-white h-[56px] max-w-[1200px] mx-auto border-b border-gray-200 px-10 grid items-center"
            style={{ gridTemplateColumns: "1fr 150px 150px 150px 150px" }}
        >
        <div className='flex items-center h-full gap-4'>
            <input type="checkbox" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-sm 
                checked:bg-[#FA5130] checked:border-[#FA5130]">
            </input>
            <div className=''>
                Sản Phẩm
            </div>
        </div>
        <div className='flex justify-center capitalize text-[#888897]'>đơn giá</div>
        <div className='flex justify-center capitalize text-[#888897]'>số lượng</div>
        <div className='flex justify-center capitalize text-[#888897]'>số tiền</div>
        <div className='flex justify-center capitalize text-[#888897]'>thao tác</div>
        </div>
    );
}
export default HeaderCart;