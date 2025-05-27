import { Outlet, useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";

function AuthLayout() {
    const location = useLocation();
    let title = "";

    if (location.pathname === "/login") {
        title = "Đăng nhập";
    } else if (location.pathname === "/register") {
        title = "Đăng ký";
    }

    return (
        <div>
            {/* Phần Header ở Layout đăng nhập/Đăng ký */}
            <div className="flex items-center justify-between" style={{ height: "85px", width: "100%", maxWidth: "1200px", margin: "0 auto", padding: "0 20px"}}>
                <div className='flex items-center'>
                    <Link to="/" className="flex items-center" style={{ textDecoration: "none", color: "#FA5130", height: "100%", fontSize: "24px", fontWeight: "400" }}>
                        <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="" style={{ height: "40px", width: "37px", marginBottom: "12px", color: "#FA5130" }}><title>Shopee</title><path fill="#FA5130" d="M15.9414 17.9633c.229-1.879-.981-3.077-4.1758-4.0969-1.548-.528-2.277-1.22-2.26-2.1719.065-1.056 1.048-1.825 2.352-1.85a5.2898 5.2898 0 0 1 2.8838.89c.116.072.197.06.263-.039.09-.145.315-.494.39-.62.051-.081.061-.187-.068-.281-.185-.1369-.704-.4149-.983-.5319a6.4697 6.4697 0 0 0-2.5118-.514c-1.909.008-3.4129 1.215-3.5389 2.826-.082 1.1629.494 2.1078 1.73 2.8278.262.152 1.6799.716 2.2438.892 1.774.552 2.695 1.5419 2.478 2.6969-.197 1.047-1.299 1.7239-2.818 1.7439-1.2039-.046-2.2878-.537-3.1278-1.19l-.141-.11c-.104-.08-.218-.075-.287.03-.05.077-.376.547-.458.67-.077.108-.035.168.045.234.35.293.817.613 1.134.775a6.7097 6.7097 0 0 0 2.8289.727 4.9048 4.9048 0 0 0 2.0759-.354c1.095-.465 1.8029-1.394 1.9449-2.554zM11.9986 1.4009c-2.068 0-3.7539 1.95-3.8329 4.3899h7.6657c-.08-2.44-1.765-4.3899-3.8328-4.3899zm7.8516 22.5981-.08.001-15.7843-.002c-1.074-.04-1.863-.91-1.971-1.991l-.01-.195L1.298 6.2858a.459.459 0 0 1 .45-.494h4.9748C6.8448 2.568 9.1607 0 11.9996 0c2.8388 0 5.1537 2.5689 5.2757 5.7898h4.9678a.459.459 0 0 1 .458.483l-.773 15.5883-.007.131c-.094 1.094-.979 1.9769-2.0709 2.0059z"/></svg>
                        Shopee
                    </Link>
                    <div className='text-2xl' style={{ color: "black", marginLeft: '16px', fontWeight: '400' }}> {title} </div>
                </div>
                <div className='flex items-center' style={{ color: "#FA5130", fontSize: "16px", fontWeight: "500", textDecoration: "none" }}>
                    <Link to="/">Bạn cần giúp đỡ?</Link>
                </div>
            </div>
            {/* Phần chứa nội dung đăng nhập/Đăng ký */}
            <div style={{ height: "600px", width: "100%", backgroundColor: 'rgb(238, 77, 45)', }}>
                <div style={{
                        backgroundImage: 'url("https://down-vn.img.susercontent.com/file/sg-11134004-7rcdu-m6hs9t6ff10y6b")',
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center center',
                        height: "100%",
                        width: "100%",
                        maxWidth: "1200px",
                        margin: "0 auto",
                    }}>
                    <div className='flex items-center justify-end' style={{ height: "100%", width: "100%", backgroundColor: '', paddingRight: '100px' }}>
                        <Outlet />
                    </div>
                </div>
            </div>
            {/* Phần Footer ở Layout đăng nhập/Đăng ký */}
            <div>

            </div>
        </div>
    )
}

export default AuthLayout;