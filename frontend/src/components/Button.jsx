function PrimaryButton({
  height = "40px",
  width = "120px",
  text,
  onClick,
  type = "button",
  children
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        height: height,
        width: width,
        borderRadius: "3px",
        color: "white",
        fontSize: "16px",
      }}
      className="relative flex items-center justify-center bg-primaryColor"
    >
      {text}
      {children}
    </button>
  );
}

export default PrimaryButton;
