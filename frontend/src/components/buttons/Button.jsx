import clsx from "clsx";

function PrimaryButton({
  height = "40px",
  width = "120px",
  text,
  onClick,
  type = "button",
  disabled,
  children,
  className,
}) {
  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      style={{
        minHeight: height,
        maxWidth: width,
        borderRadius: "3px",
        color: "white",
        fontSize: "16px",
      }}
      disabled={disabled}
      className={clsx(
        "relative flex flex-1 w-full h-full items-center justify-center bg-primaryColor transition-opacity duration-200",
        disabled ? "opacity-60 cursor-not-allowed" : "hover:brightness-110",
        className,
      )}
    >
      {text}
      {children}
    </button>
  );
}

export default PrimaryButton;
