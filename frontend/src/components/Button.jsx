function PrimaryButton({
    height = "40px",
    width = "120px",
    text,
    onClick,
    type = "button", 
}) {
  return (
    <button
        type={type}
        onClick={onClick}
        style={{
            height: height,
            width: width,
            backgroundColor: "#FA5130",
            borderRadius: "3px",
            color: "white",
            fontSize: "16px",
        }}
        className="flex items-center justify-center"
        >
        {text}
    </button>
  );
}

export default PrimaryButton;
