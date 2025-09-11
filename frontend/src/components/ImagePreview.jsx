import { useState, useEffect } from "react";
import ImageReveal from "./animations/ImageReveal";

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
            <ImageReveal mainImage={mainImage} width={450} height={450} gridSize={8} animationDuration={0.5} />
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
                                ${ hoverIndex === index ? "border-primaryColor" : "border-transparent"}`}
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