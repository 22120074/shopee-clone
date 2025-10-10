import { useState, useEffect, useRef } from "react";
import { updateUserAvatar } from "../../services/user.service";
import Spinner from "../skeletons/spinnerButton";

function FileSubmitButton({ user, addToast, dispatch, updateAvatar_Redux }) {
    // UseState để quản lý trạng thái mở/đóng của modal
    const [isOpen, setIsOpen] = useState(false);
    // UseState để quản lý animation khi mở/đóng modal
    const [isAnimating, setIsAnimating] = useState(false);
    // UseRef để tham chiếu đến input file
    const fileInputRef = useRef(null);
    // UseState để quản lý file, URL được chọn, Cơ chế lưu: [URL], [File Object]
    const [selectedFile, setSelectedFile] = useState(null);
    const [url, setUrl] = useState("");
    // const [typeSave, setTypeSave] = useState(0); // 1: URL, 2: File Object
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen) setIsAnimating(true);
    }, [isOpen]);

    // useEffect(() => {
    //     console.log("Selected File:", selectedFile);
    //     console.log("URL:", url);
    //     console.log("Type Save:", typeSave);
    // }, [selectedFile, url, typeSave]);

    // Xử lí điều kiện của file
    const handleFile = (file) => {
        // Kiểm tra định dạng file
        const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!validTypes.includes(file.type)) {
            addToast('Vui lòng chọn tệp ảnh hợp lệ (JPEG, PNG, GIF)', 'error', 'warning');
            fileInputRef.current.value = null;
            return;
        }
        // Kiểm tra kích thước file (ví dụ: không quá 1MB)
        const maxSize = 1 * 1024 * 1024;
        if (file.size > maxSize) {
            addToast('Kích thước tệp quá lớn. Vui lòng chọn tệp nhỏ hơn 1MB.', 'error', 'warning');
            fileInputRef.current.value = null;
            return;
        }
        // Xử lí tệp hợp lệ (ví dụ: tải lên server hoặc hiển thị ảnh)
        setSelectedFile(file);
        // setTypeSave(2); // 2: File Object
    }

    // 1. Xử lí Input File khi người dùng chọn tệp
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            handleFile(file);
        }
    }

    // 2. Xử lí Drag and Drop
    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
    }

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFile(file);
        }
    }

    const handleFileInputClick = () => {
        fileInputRef.current.click();
    }

    // 3. Xử lí Submit - Ưu tiên Url
    const handleSubmit = async () => {
        try {
            setIsLoading(true);
            let response;
            if (url) {
                response = await updateUserAvatar(user?.userId || user?.googleID, url, true);
            } else if (selectedFile) {
                response = await updateUserAvatar(user?.userId || user?.googleID, selectedFile, false);
            }
            if (response) {
                dispatch(updateAvatar_Redux(response.data.avatarUrl));
                addToast('Cập nhật ảnh đại diện thành công!', 'success', 'check');
                setIsOpen(false);
                setSelectedFile(null);
                setUrl("");
            }
        } catch (error) {
            console.error("Error updating avatar:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <button className={`flex items-center justify-center bg-white text-black border border-black rounded-sm px-4 w-auto h-10
                    border-lessgrayColor text-sm font-normal
                `}
                onClick={() => setIsOpen(true)}
            >
                Thay đổi ảnh đại diện
            </button>
            {/* Modal */}
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
                    {/* Nơi Drag và Drop hoặc Chọn tệp bằng Button */}
                    <div className="relative border-2 border-dashed border-lessgrayColor bg-backgroundLightGrayColor rounded-md w-full h-40 mt-4
                        flex flex-col items-center justify-center gap-1 cursor-pointer"
                        onClick={handleFileInputClick}
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                    >
                        <div className="text-lg font-medium">Kéo & Thả Tệp Ảnh</div>
                        <div className="">hoặc</div>
                        <label className="bg-blueButton text-white px-6 py-2 rounded-md cursor-pointer" onClick={(e) => e.stopPropagation()}>
                            Chọn tệp
                            <input ref={fileInputRef} type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                        </label>
                    </div>
                    <div className="w-full flex items-center justify-center gap-2 my-4 text-moregrayTextColor">
                        <div className="flex-1 border-b border-lesslessgrayColor"></div>
                        <div>Hoặc</div>
                        <div className="flex-1 border-b border-lesslessgrayColor"></div>
                    </div>
                    {/* Nơi dán URL ảnh */}
                    <div className="w-full flex flex-col items-start justify-start gap-2">
                        <label htmlFor="">
                            Nhập URL Ảnh
                        </label>
                        <div className="w-full flex items-center justify-start gap-2">
                            <input type="text" className="w-full flex-1 border border-lessgrayColor rounded-md px-4 py-2 
                                text-blueButton" 
                                placeholder="Nhập URL ảnh tại đây"
                                value={url}
                                onChange={(e) => { setUrl(e.target.value); 
                                    // setTypeSave(1); 
                                }}
                            />
                        </div>
                    </div>
                    <div className="w-full border-b border-lesslessgrayColor my-8"></div>
                    <div className="w-full flex items-center justify-between mb-2 gap-2">
                        <div className="text-blueButton flex-1 overflow-hidden whitespace-nowrap text-ellipsis">
                            {selectedFile ? (
                            <>
                                <span className="text-black">Đã chọn: </span>
                                {selectedFile.name}
                            </>) : (
                                <span></span>
                            )}
                        </div>
                        <div className="flex items-center justify-center gap-4">
                            <button className="relative bg-blueButton text-white px-6 py-2 rounded-md cursor-pointer"
                                onClick={() => handleSubmit()}
                            >
                                Tải lên
                                <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
                                    ${isLoading ? "bg-white/50" : "hidden"}`}
                                >
                                    <Spinner 
                                        size={"30px"} 
                                        stroke={"5px"}  
                                        _hidden={isLoading ? "" : "hidden"}
                                        color={"white"}
                                    />
                                </div>     
                            </button>
                            <button className="bg-backgroundGrayColor text-black border border-black rounded-md px-6 h-10
                                border-lessgrayColor text-md font-normal"
                                onClick={() => setIsOpen(false)}
                            >
                                Đóng
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}
export default FileSubmitButton;