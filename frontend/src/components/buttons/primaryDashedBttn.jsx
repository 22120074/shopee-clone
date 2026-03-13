export default function PrimaryDashedButton({
  height = "40px",
  width = "120px",
  text,
  onClick,
  type = "button",
  disabled,
  children,
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        height: height,
        width: width,
        fontSize: "16px",
      }}
      disabled={disabled}
      className="border border-dashed flex flex-row gap-2 items-center justify-center 
        rounded-sm transition-colors border-primaryTextColor text-primaryTextColor 
        cursor-pointer hover:bg-primaryRatingColor bg-white"
    >
      {children}
      {text}
    </button>
  );
}
