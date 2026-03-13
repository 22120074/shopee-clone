function PrimaryButton({
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
      onClick={disabled ? undefined : onClick}
      style={{
        height: height,
        width: width,
        borderRadius: "3px",
        color: "white",
        fontSize: "16px",
      }}
      disabled={disabled}
      className={`relative flex items-center justify-center bg-primaryColor transition-opacity duration-200 ${
        disabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-110"
      }`}
    >
      {text}
      {children}
    </button>
  );
}

export default PrimaryButton;
