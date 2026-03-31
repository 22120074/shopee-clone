import clsx from "clsx";

export default function SidebarPopupButton({ isOpen, setIsOpen }) {
  const handleClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <button
      className={clsx(
        "fixed top-24 md:hidden w-10 h-10 bg-primaryColor text-white rounded-full",
        "flex items-center justify-end p-2",
        "[box-shadow:0_0_8px_rgba(0,0,0,0.5)] transition-all duration-300 z-50",
        { "left-48": isOpen, "-left-4": !isOpen },
      )}
      style={{ perspective: "1000px" }}
      onClick={handleClick}
    >
      {isOpen ? (
        <i className="fa-solid fa-caret-left text-2xl"></i>
      ) : (
        <i className="fa-solid fa-caret-right text-2xl"></i>
      )}
    </button>
  );
}
