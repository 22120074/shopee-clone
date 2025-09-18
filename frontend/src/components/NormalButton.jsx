function NormalButton({
    typeSort,
    sortOption,
    pageIndex,
    height,
    min_width,
    text,
    onClick,
    className = "",
    type = "button", 
}) {
    return (
        <button
            type={type}
            onClick={() => onClick(typeSort, pageIndex)}
            style={{
                height: height,
                minWidth: min_width,
            }}
            className={`flex items-center justify-center bg-white text-black border border-black rounded-sm ${className} px-4 w-auto h-auto
                ${typeSort === sortOption ? 'border-primaryColor text-primaryColor' : 'border-lessgrayColor'} text-base font-normal
            `}
        >
            {text}
        </button>
    );
}

export default NormalButton;
