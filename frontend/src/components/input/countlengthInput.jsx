export default function CountLengthInput({
  id,
  value = "",
  onChange,
  maxLength,
  type = "text",
  widthInput,
  className = "",
}) {
  return (
    <div
      className={`relative ${className}`}
      style={{
        width: widthInput,
      }}
    >
      <input
        type={type}
        id={id}
        row={1}
        className={`w-full h-10 border border-gray-300 rounded-sm p-2 pr-[60px] focus:outline-none
             text-[14px] text-dark hover:border-gray-400 focus:border-gray-400`}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
        placeholder="Vui lòng nhập vào!"
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
        <div className="w-[1px] h-6 bg-gray-300"></div>
        <span className="text-[13px] text-gray-400">
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
