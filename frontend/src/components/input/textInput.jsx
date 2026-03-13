export default function TextInput({
  textLabel = "",
  value,
  onChange,
  placeholder = "",
  widthInput,
  heightInput,
  id,
  className,
  disabled = false,
  type = "text",
}) {
  return (
    <div className="flex items-center gap-2 lg:gap-4">
      <label
        htmlFor={id}
        className="w-auto min-w-[60px] lg:w-[80px] text-left lg:text-right text-[14px]"
      >
        <span className="text-red-500">*</span>
        {textLabel}
      </label>
      <div className="flex-1 relative">
        <input
          type={type}
          id={id}
          style={{
            width: widthInput,
            height: heightInput,
          }}
          className={`w-full h-9 border border-gray-300 rounded-sm p-2 focus:outline-none
             text-[14px] text-dark hover:border-gray-400 focus:border-gray-400 ${className}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
        />
      </div>
    </div>
  );
}
