function NormalButton({
  typeSort,
  sortOption,
  height,
  min_width,
  text,
  onClick,
  className = "",
  type = "button",
  children,
  icon,
}) {
  const isActive = typeSort === sortOption;
  const baseClasses =
    "flex items-center justify-center bg-white rounded-sm px-4 w-auto h-auto text-base font-normal transition-all";
  const stateClasses = isActive
    ? "border border-primaryColor text-primaryColor"
    : "border border-lessgrayColor text-black";
  const finalClassName = `${baseClasses} ${stateClasses} ${className}`.trim();
  return (
    <button
      type={type}
      onClick={() => onClick(typeSort)}
      style={{
        height: height,
        minWidth: min_width,
      }}
      className={finalClassName}
    >
      {icon}
      {text}
      {children}
    </button>
  );
}

export default NormalButton;
