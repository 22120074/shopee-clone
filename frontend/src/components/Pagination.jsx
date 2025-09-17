import { useEffect, useState } from "react";

function Pagination({ totalPages, currentPage, onPageChange }) {
    // Sử dụng useEffect để lưu ectLeft, ectRight khi currentPage thay đổi
    const [extLeft, setExtLeft] = useState(-1);
    const [extRight, setExtRight] = useState(-1);

    useEffect(() => {
        if (currentPage + 2 < totalPages - 1) 
            setExtRight(currentPage + 3);
        else
            setExtRight(-1);
        if (currentPage - 2 > 1 && currentPage > 4)
            setExtLeft(currentPage - 3);
        else
            setExtLeft(-1);
        console.log('extLeft:', extLeft, 'extRight:', extRight);
    }, [currentPage, totalPages, extLeft, extRight]);

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
        <div className="relative inline-flex justify-center items-center gap-3 my-6 px-20 w-auto h-auto">
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} page={index}
                    isActive={index === currentPage}
                    onClick={onPageChange}
                    isHidden={(index < currentPage - 2 || index > currentPage + 2) && index > 1}
                />
            ))}
            <button className="absolute w-10 h-10 text-grayTextColor rounded-sm left-0 ml-2 top-1/2 -translate-y-1/2" onClick={() => onPageChange(currentPage - 1)}>
                <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="absolute w-10 h-10 text-grayTextColor rounded-sm right-0 mr-2 top-1/2 -translate-y-1/2" onClick={() => onPageChange(currentPage + 1)}>
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </div>
    )
}
export default Pagination;