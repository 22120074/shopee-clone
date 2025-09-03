
function DetailProductDropDown({ openDropdown, index }) {

    return (
        <div className={`absolute top-full right-0 w-[140px] bg-white border border-gray-200 shadow-md rounded-md overflow-hidden z-10 
            selectedProduct_dropdown ${openDropdown === index ? 'block' : 'hidden'}`}
        >
            
        </div>
    )
}

export default DetailProductDropDown;