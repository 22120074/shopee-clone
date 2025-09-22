import { useEffect, useState } from "react";

function Pagination({ totalPages, currentPage, onPageChange, isPhone }) {
    // Sử dụng useEffect để lưu ectLeft, ectRight khi currentPage thay đổi
    const [extLeft, setExtLeft] = useState(-1);
    const [extRight, setExtRight] = useState(-1);

    useEffect(() => {
        let visibleIndex = 2;
        if (isPhone)
            visibleIndex = 1;
        if (currentPage + visibleIndex < totalPages - 1)
            setExtRight(currentPage + (visibleIndex + 1));
        else
            setExtRight(-1);
        if (currentPage - visibleIndex > 1 && (!isPhone ? currentPage > 4 : currentPage > 2))
            setExtLeft(currentPage - (visibleIndex + 1));
        else
            setExtLeft(-1);
    }, [currentPage, totalPages, extLeft, extRight, isPhone]);

    // useEffect(() => {
    //     console.log('current page:', currentPage, 'extLeft:', extLeft, 'extRight:', extRight);
    // }, [extLeft, extRight, currentPage]);

    const Button = ({ page, isActive, onClick, isHidden }) => (
        <button className={`w-10 h-8 mx-1 text-center relative
            ${isActive ? 'border bg-primaryColor text-white' : 'border bg-white text-grayTextColor hover:bg-primaryColor'} rounded-sm
            ${isHidden && page !== extLeft && page !== extRight ? 'hidden' : 'inline-block'}
            ${page === extLeft || page === extRight ? 'border-none pointer-events-none' : ''}
            `}
            onClick={() => onClick(page)}
        >
            {(page === extLeft || page === extRight) ? 
                <i className="fa-solid fa-ellipsis absolute bottom-0 left-1/2 transform -translate-x-1/2"></i> 
                : 
                page + 1
            }
        </button>
    );

    return (
        <div className="relative inline-flex justify-center items-center gap-1 md:gap-3 my-6 md:px-20 w-full md:w-auto h-auto">
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} page={index}
                    isActive={index === currentPage}
                    onClick={onPageChange}
                    isHidden={!isPhone 
                        ? ((index < currentPage - 2 || index > currentPage + 2) && index > 1) 
                        : ((index < currentPage - 1 || index > currentPage + 1) && index > 0)}
                />
            ))}
            <button className="absolute w-10 h-10 text-grayTextColor rounded-sm left-[-10px] md:left-0 top-1/2 -translate-y-1/2" onClick={() => onPageChange(currentPage - 1)}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="absolute w-10 h-10 text-grayTextColor rounded-sm right-[-10px] md:right-0 top-1/2 -translate-y-1/2" onClick={() => onPageChange(currentPage + 1)}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}
export default Pagination;