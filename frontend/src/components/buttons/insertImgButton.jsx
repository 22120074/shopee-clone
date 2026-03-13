export default function InsertImgButton({
  imgData,
  setImgData,
  width = "80px",
  height = "80px",
  text = "Thêm ảnh",
}) {
  const previewUrl = imgData?.preview || "";

  return (
    <div
      className={`relative group rounded-sm overflow-hidden flex flex-col items-center justify-center transition-colors 
        ${previewUrl ? "border border-gray-200" : "border border-dashed border-[#ee4d2d] text-[#ee4d2d] cursor-pointer hover:bg-orange-50"}`}
      style={{ width, height }}
    >
      {previewUrl ? (
        <>
          <img
            src={previewUrl}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute top-0 right-0 hidden group-hover:flex items-center justify-center 
            w-6 h-6 bg-gray-200/70 rounded-bl-sm cursor-pointer hover:bg-red-500"
            onClick={(e) => {
              e.preventDefault();
              setImgData(null);
            }}
          >
            <i className="fa-solid fa-trash text-white text-xs"></i>
          </div>
        </>
      ) : (
        <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
              clipRule="evenodd"
            />
          </svg>
          {text && (
            <span className="text-[10px] text-center px-1 mt-1 leading-tight">
              {text}
            </span>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                setImgData({
                  file: file,
                  preview: URL.createObjectURL(file),
                });
              }
            }}
          />
        </label>
      )}
    </div>
  );
}
