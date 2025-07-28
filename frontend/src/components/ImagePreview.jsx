import React, { useState, useEffect } from "react";

function ImagePreview({ images }) {
    const [mainImage, setMainImage] = useState(images[0].imageUrl);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [hoverIndex, setHoverIndex] = useState(0);
    const length = images.length;

    const goPrev = () => {
        setCurrentIndex(i => (i === 0 ? length - 5 : i - 1));
    };

    const goNext = () => {
        setCurrentIndex(i => (i >= length - 5 ? 0 : i + 1));
    };

    useEffect(() => {
    }, [hoverIndex]);

    return (
        <div className="flex flex-col">
            <div
                className="w-[452px] h-[450px] mb-4 bg-center bg-no-repeat bg-cover bg-gray-200"
                style={{ backgroundImage: `url(${mainImage})` }}
            />
            <div className="relative overflow-hidden max-w-[452px]">
                <ul className="h-[80px] flex flex-row self-start transition-transform duration-500 ease gap-2"
                    style={{
                        width: `${length * 84 + (length - 1) * 8}px`,
                        transform: `translateX(-${currentIndex * (84 + 8)}px)`,
                    }}>
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`w-[84px] h-[80px] cursor-pointer bg-center bg-cover bg-gray-200 border-2
                                ${ hoverIndex === index ? "border-[#FA5130]" : "border-transparent"}`}
                            style={{ backgroundImage: `url(${image.imageUrl})` }}
                            onMouseEnter={() => {
                                setMainImage(image.imageUrl);
                                setHoverIndex(index);
                            }}
                        />
                    ))}
                </ul>
                <button
                    onClick={goPrev}
                    className="absolute top-1/2 -translate-y-1/2 left-0 h-[38px] w-[26px] bg-[rgba(135,135,135,0.5)] border-none rounded-[2px] text-white text-[20px] px-2 cursor-pointer"
                    >
                    <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button
                    onClick={goNext}
                    className="absolute top-1/2 -translate-y-1/2 right-0 h-[38px] w-[26px] bg-[rgba(135,135,135,0.5)] border-none rounded-[2px] text-white text-[20px] px-2 cursor-pointer"
                    >
                    <i className="fa-solid fa-chevron-right"></i>
                </button>
            </div>
        </div>
    )
}
export default ImagePreview;