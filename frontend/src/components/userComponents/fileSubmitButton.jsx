import { useState, useEffect } from "react";


function FileSubmitButton() {
    // UseState để quản lý trạng thái mở/đóng của modal
    const [isOpen, setIsOpen] = useState(false);
    // UseState để quản lý animation khi mở/đóng modal
    const [isAnimating, setIsAnimating] = useState(false);

    
    useEffect(() => {
        if (isOpen) setIsAnimating(true);
    }, [isOpen]);

    return (
        <>
            <button className={`flex items-center justify-center bg-white text-black border border-black rounded-sm px-4 w-auto h-10
                    border-lessgrayColor text-sm font-normal
                `}
                onClick={() => setIsOpen(true)}
            >
                Thay đổi ảnh đại diện
            </button>         
            {isAnimating && (
            <div className="fixed inset-0 z-20">
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10" onClick={() => setIsOpen(false)}></div>
                <div className={`absolute top-1/2 left-1/2 max-w-[600px] w-full h-auto
                    flex flex-col items-start justify-start bg-white rounded-lg py-4 px-8 select-none z-20
                    ${isOpen ? 'animate-zoomInAbsolute' : 'animate-zoomOutAbsolute'}`}
                    onAnimationEnd={() => {
                        if (!isOpen) setIsAnimating(false);
                    }}
                >
                    <div className="w-full border-b border-lesslessgrayColor pb-4">
                        <div className="text-xl text-black font-semibold">Tải ảnh đại diện</div>
                        <div className="text-base text-moregrayTextColor font-medium">Nhập Url hoặc tải ảnh bạn thích từ thiết bị của mình</div>
                    </div>
                    <div className="relative border-2 border-dashed border-lessgrayColor bg-backgroundLightGrayColor rounded-md w-full h-40 mt-4
                        flex flex-col items-center justify-center gap-1
                    ">
                        <div className="text-lg font-medium">Kéo & Thả Tệp Ảnh</div>
                        <div className="">hoặc</div>
                        <label className="bg-blueButton text-white px-6 py-2 rounded-md cursor-pointer">
                            Chọn tệp
                            <input type="file" className="hidden" />
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2 my-4 text-moregrayTextColor">
                        <div className="flex-1 border-b border-lesslessgrayColor"></div>
                        <div>Hoặc</div>
                        <div className="flex-1 border-b border-lesslessgrayColor"></div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                        <label htmlFor="">
                            Nhập URL Ảnh
                        </label>
                        <div className="w-full flex items-center justify-start gap-2">
                            <input type="text" className="w-full flex-1 border border-lessgrayColor rounded-md px-4 py-2 
                                text-blueButton" 
                                placeholder="Nhập URL ảnh tại đây"
                            />
                            <button className="bg-blueButton text-white px-6 py-2 rounded-md cursor-pointer">
                                Tải lên
                            </button>
                        </div>
                    </div>
                    <div className="w-full border-b border-lesslessgrayColor my-8"></div>
                    <div className="w-full flex items-center justify-end mb-2">
                        <button className="bg-backgroundGrayColor text-black border border-black rounded-md px-8 h-10
                            border-lessgrayColor text-md font-normal"
                            onClick={() => setIsOpen(false)}
                        >
                            Đóng
                        </button>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}
export default FileSubmitButton;