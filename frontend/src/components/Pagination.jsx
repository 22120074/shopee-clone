
function Pagination({ totalPages, currentPage, onPageChange }) {

    const Button = ({ page, isActive, onClick }) => (
        <button className={`w-10 h-8 mx-1 text-center 
            ${isActive ? 'border bg-primaryColor text-white' : 'border bg-white text-grayTextColor hover:bg-primaryColor'} rounded-sm`}
            onClick={() => onClick(page)}
        >
            {page + 1}
        </button>
    );

    return (
        <div className="relative inline-flex justify-center items-center gap-3 my-6 px-20 w-auto h-auto">
            {Array.from({ length: totalPages }, (_, index) => (
                <Button key={index} page={index}
                    isActive={index === currentPage}
                    onClick={onPageChange}
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