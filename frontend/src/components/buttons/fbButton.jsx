import { FaFacebook } from "react-icons/fa"; // Icon Facebook đầy đủ màu

function FBButton({ disabled, setLoadingSpecial, children }) {

    return (
        <button onClick={() => { 
                setLoadingSpecial(true);
            }}
            disabled={disabled}
            className="relative flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center"
        >
            <FaFacebook className="w-5 h-5 mr-2" style={{ color: "#1877F2" }} />
            <span>Facebook</span>
            {children}
        </button>
    );
}
export default FBButton;