import { useRef, useEffect, useCallback, useState } from 'react';
import { gsap } from 'gsap';

function ImageReveal({ mainImage, width, height, gridSize = 10, pixelColor = '#ffffff', animationDuration = 0.5, className = 'mb-4', isPhone, 
    isIPad
}) {
    const containerRef = useRef(null);
    const pixelsRef = useRef(null);
    const mainRef = useRef(null);
    const delayCallRef = useRef(null);

    const [lastImage, setLastImage] = useState(mainImage);
    
    useEffect(() => {
        const pixelRefEl = pixelsRef.current;
        if (!pixelRefEl) return;
        pixelRefEl.innerHTML = '';

        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                const pixel = document.createElement('div');
                pixel.className = 'pixelChildren';
                pixel.style.position = 'absolute';
                pixel.style.display = 'none';
                pixel.style.backgroundColor = pixelColor;

                const size = 100 / gridSize;
                pixel.style.width = `${size}%`;
                pixel.style.height = `${size}%`;
                pixel.style.left = `${col * size}%`;
                pixel.style.top = `${row * size}%`;

                pixelRefEl.appendChild(pixel);
            }
        }
    }, [gridSize, pixelColor]);

    const revealAnimation = useCallback((active) => {
        const pixelsRefEl = pixelsRef.current;
        const mainRefEl = mainRef.current;
        if (!pixelsRefEl || !mainRefEl) return;

        const pixels = pixelsRefEl.querySelectorAll('.pixelChildren');
        if (pixels.length === 0) return;

        // Xóa animetion cũ
        gsap.killTweensOf(pixels);
        if (delayCallRef.current) {
            delayCallRef.current.kill();
        }

        // Ẩn tất cả pixel
        gsap.set(pixels, { display: 'none' });

        // 
        const totalPixels = pixels.length;
        const eachAnimationDuration = animationDuration / totalPixels;

        gsap.to(pixels, {
            display: 'block',
            duration: 0,
            stagger: {
                each: eachAnimationDuration,
                from: 'random',
            }
        });
        
        delayCallRef.current = gsap.delayedCall(animationDuration, () => {
            mainRefEl.style.display = active ? 'block' : 'none';
            mainRefEl.style.pointerEvents = active ? 'auto' : 'none';
            setLastImage(mainImage);
        });

        gsap.to(pixels, {
            display: 'none',
            duration: 0,
            delay: animationDuration,
            stagger: {
                each: eachAnimationDuration,
                from: 'random',
            }
        });
    }, [animationDuration, mainImage, setLastImage]);

    useEffect(() => {
        if (mainImage) {
            revealAnimation(false);
        }
    }, [mainImage, revealAnimation]);

    return (
        <div ref={containerRef} className={`relative ${className} `} 
            style={{ 
                width: isPhone ? '100%' : (!isIPad ? `${width}px` : '380px'), 
                height: isPhone ? '350px' : (!isIPad ? `${height}px` : '350px')
            }}
        >
            {/* Hiển thị ảnh chính */}
            <div className={`absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gray-200`}
                style={{ backgroundImage: `url(${lastImage})`,
                }}>
            </div>
            {/* Hiển thị ảnh tiếp theo */}
            <div ref={mainRef} className={`absolute top-0 left-0 w-full h-full bg-center bg-no-repeat bg-cover bg-gray-200`}
                style={{ backgroundImage: `url(${mainImage})`,
                }}>
            </div>
            {/* Lưới pixel để tạo hiệu ứng */}
            <div ref={pixelsRef} className="absolute top-0 left-0 w-full h-full parentPixelGrid">
            </div>
        </div>
    );
}
export default ImageReveal;