import { useDispatch } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { emailHidden } from "../../../utils/stringFormat";
import { hiddenPhone } from "../../../utils/numberFormat";
import { updateUserProfile } from "../../../services/user.service";
import { updateProfile_Redux } from "../../../features/auth/authSlice";
import './../../../css/offElement.css'
import PrimaryButton from "../../../components/Button";
import Spinner from "../../../components/skeletons/spinnerButton";

function UserProfile() {
    const dispatch = useDispatch();
    const { addToast, user } = useOutletContext();
    // UseState lưu giới tính, tên, tên hiển thị, ngày sinh
    const [displayNameForm, setDisplayNameForm] = useState(user?.displayName || "");
    const [nameForm, setNameForm] = useState(user?.name || "");
    const [genderForm, setGenderForm] = useState(user?.gender); // male, female, other
    const [day, setDay] = useState(user?.dateOfBirth ? new Date(user.dateOfBirth).getDate() : "");
    const [month, setMonth] = useState(user?.dateOfBirth ? new Date(user.dateOfBirth).getMonth() + 1 : "");
    const [year, setYear] = useState(user?.dateOfBirth ? new Date(user.dateOfBirth).getFullYear() : "");
    // UseState ngày, tháng, năm sinh, mở rộng dropdown Date, bắt lỗi nhập Date
    const [openDropdown, setOpenDropdown] = useState({ day: false, month: false, year: false, });
    const [dateError, setDateError] = useState("");
    // Ref và useEffect để bắt sự kiện click ngoài dropdown của Date
    const dayRef = useRef(null);
    const monthRef = useRef(null);
    const yearRef = useRef(null);
    // UseState để lưu trạng thái loading
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dayRef.current && !dayRef.current.contains(event.target) && monthRef.current && !monthRef.current.contains(event.target) && yearRef.current && !yearRef.current.contains(event.target)) {
                setOpenDropdown({
                    day: false,
                    month: false,
                    year: false,
                });
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // useEffect để validate ngày tháng năm sinh
    useEffect(() => {
        if (day && month && year) {
            const date = new Date(year, month - 1, day); // chú ý: month - 1 vì JS month 0-11

            if (
                date.getFullYear() === Number(year) &&
                date.getMonth() === Number(month) - 1 &&
                date.getDate() === Number(day)
            ) {
                setDateError("");
            } else {
                setDateError("Ngày sinh không hợp lệ!");
            }
        }
    }, [day, month, year]);

    const handleSubmitForm = async () => {
        try {
            setIsLoading(true);
            const date = new Date(year, month - 1, day);
            console.log(date);
            const response = await updateUserProfile(user?.userId || user?.googleID, displayNameForm, nameForm, genderForm, date);
            if (response) {
                dispatch(updateProfile_Redux({
                    displayName: displayNameForm,
                    name: nameForm,
                    gender: genderForm,
                    dateOfBirth: date,
                }));
                addToast("Cập nhật hồ sơ thành công!", "success", "check");
            }
        } catch (error) {
            console.error("Error updating profile:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <div className="flex flex-1 flex-col items-start justify-start bg-white mt-4 rounded-sm shadow-md py-4 px-8">
        <div className="w-full border-b border-lesslessgrayColor pb-4">
            <div className="text-xl text-black">Hồ sơ của tôi</div>
            <div className="text-base text-moregrayTextColor">Quản lí thông tin hồ sơ để bảo mật tài khoản</div>
        </div>
        <div className="w-full grid grid-cols-[1fr_280px] mt-10">
            <form action="" className="grid grid-cols-[120px_1fr] gap-y-6 px-10 border-r border-lesslessgrayColor" autoComplete="off" >
                {/* Tên hiển thị */}
                <label htmlFor="displayName" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Tên hiển thị</label>
                <input 
                    type="text" 
                    id="displayName" 
                    className="h-9 border border-gray-300 rounded-sm p-2 ml-4 focus:outline-none text-[15px]" 
                    value={displayNameForm}
                    onChange={(e) => setDisplayNameForm(e.target.value)}
                />
                {/* Họ và tên */}
                <label htmlFor="userName" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Họ và tên</label>
                <input 
                    type="text" 
                    id="userName" 
                    className="h-9 border border-gray-300 rounded-sm p-2 ml-4 focus:outline-none text-[15px]" 
                    value={nameForm}
                    onChange={(e) => setNameForm(e.target.value)}
                />
                {/* Email */}
                <label htmlFor="userEmail" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Email</label>
                <div type="text" id="userEmail" className="flex items-center justify-between h-9 ml-4 text-[15px]">
                    {emailHidden(user?.email) || "Chưa thiết lập Email"}
                    <Link to={user.email ? '/user/account/email-vertify' : '/user/account/no-email-update'} className='text-primaryTextColor text-sm'>Thay đổi</Link>
                </div>
                {/* Số điện thoại */}
                <label htmlFor="userPhone" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Số điện thoại</label>
                <div type="text" id="userPhone" className="flex items-center justify-between h-9 ml-4 text-[15px]">
                    {hiddenPhone(user?.phone) || "Chưa thiết lập số điện thoại"}
                    <Link to='/user/account/phone-vertify' className='text-primaryTextColor text-sm'>Thay đổi</Link>
                </div>
                {/* Giới tính */}
                <label htmlFor="userSex" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Giới tính</label>
                <div className="flex items-center h-9 ml-4">
                    <input type="radio" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-full
                        checked:border-primaryColor cursor-pointer
                        checked:before:content-[''] 
                        checked:before:block checked:before:w-[11px] checked:before:h-[11px] checked:before:absolute 
                        checked:before:top-1/2 checked:before:left-1/2
                        checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                        checked:before:rounded-full checked:before:bg-primaryColor"
                        value={"male"}
                        checked={genderForm === "male"}
                        onChange={(e) => setGenderForm(e.target.value)}
                    >
                    </input>
                    <span className="ml-2 mr-4 text-[15px]">Nam</span>
                    <input type="radio" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-full
                        checked:border-primaryColor cursor-pointer
                        checked:before:content-[''] 
                        checked:before:block checked:before:w-[11px] checked:before:h-[11px] checked:before:absolute 
                        checked:before:top-1/2 checked:before:left-1/2
                        checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                        checked:before:rounded-full checked:before:bg-primaryColor"
                        value={"female"}
                        checked={genderForm === "female"}
                        onChange={(e) => setGenderForm(e.target.value)}
                    >
                    </input>
                    <span className="ml-2 mr-4 text-[15px]">Nữ</span>
                    <input type="radio" className="relative appearance-none w-[18px] h-[18px] border border-[#DBDBDB] rounded-full
                        checked:border-primaryColor cursor-pointer
                        checked:before:content-[''] 
                        checked:before:block checked:before:w-[11px] checked:before:h-[11px] checked:before:absolute 
                        checked:before:top-1/2 checked:before:left-1/2
                        checked:before:-translate-x-1/2 checked:before:-translate-y-1/2
                        checked:before:rounded-full checked:before:bg-primaryColor"
                        value={"other"}
                        checked={genderForm === "other"}
                        onChange={(e) => setGenderForm(e.target.value)}
                    >
                    </input>
                    <span className="ml-2 mr-4 text-[15px]">Khác</span>
                </div>
                {/* Ngày sinh */}
                <label htmlFor="dateBirth" className="flex items-center justify-end text-[15px] text-moregrayTextColor">Ngày sinh</label>
                <div className="relative flex items-center ml-4 gap-2">
                    <div ref={dayRef} className="relative flex-1 h-9 max-w-[120px] border border-gray-300 rounded-sm px-2 focus:outline-none text-sm"
                        onClick={() => setOpenDropdown({ day: !openDropdown.day, month: false, year: false })}
                    >
                        <input
                            type="number"
                            name="day"
                            className="w-full h-full appearance-none focus:outline-none"
                            placeholder="Ngày"
                            value={day}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    setDay('');
                                } else {
                                    setDay(Math.min(Number(val), 31));
                                }
                            }}
                        />
                        <div className={`absolute top-9 left-0 w-full max-h-40 bg-white flex flex-col px-4 gap-1 ${!openDropdown.day ? 'hidden' : ''}
                            border border-gray-300 rounded-sm shadow-md overflow-y-auto z-20`}
                        >
                            {[...Array(31)].map((_, index) => {
                                const day = index + 1;
                                return (
                                    <div key={day} value={day} onClick={() => setDay(day)}
                                        className="cursor-pointer border-b border-lesslessgrayColor w-full text-center"
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                        <i className={`absolute right-2 top-1/2 transform -translate-y-1/2 fa-solid fa-chevron-down text-sm transition-transform duration-100 z-10 
                            ${openDropdown.day ? 'rotate-180' : 'rotate-0'}`}>
                        </i>
                    </div>
                    <div ref={monthRef} className="relative flex-1 h-9 max-w-[120px] border border-gray-300 rounded-sm px-2 focus:outline-none text-sm"
                        onClick={() => setOpenDropdown({ day: false, month: !openDropdown.month, year: false })}
                    >
                        <input
                            type="number"
                            name="month"
                            className="w-full h-full appearance-none focus:outline-none"
                            placeholder="Tháng"
                            value={month}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    setMonth('');
                                } else {
                                    setMonth(Math.min(Number(val), 12));
                                }
                            }}
                        />
                        <div className={`absolute top-9 left-0 w-full max-h-40 bg-white flex flex-col px-4 gap-1 ${!openDropdown.month ? 'hidden' : ''}
                            border border-gray-300 rounded-sm shadow-md overflow-y-auto z-20`}
                        >
                            {[...Array(12)].map((_, index) => {
                                const month = index + 1;
                                return (
                                    <div key={month} value={month} onClick={() => setMonth(month)}
                                        className="cursor-pointer border-b border-lesslessgrayColor w-full text-center"
                                    >
                                        {month}
                                    </div>
                                );
                            })}
                        </div>
                        <i className={`absolute right-2 top-1/2 transform -translate-y-1/2 fa-solid fa-chevron-down text-sm transition-transform duration-100 z-10 
                            ${openDropdown.month ? 'rotate-180' : 'rotate-0'}`}>
                        </i>
                    </div>
                    <div ref={yearRef} className="relative flex-1 h-9 max-w-[120px] border border-gray-300 rounded-sm px-2 focus:outline-none text-sm"
                        onClick={() => setOpenDropdown({ day: false, month: false, year: !openDropdown.year })}
                    >
                        <input
                            type="number"
                            name="year"
                            className="w-full h-full appearance-none focus:outline-none"
                            placeholder="Năm"
                            value={year}
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val === '') {
                                    setYear('');
                                } else {
                                    setYear(Math.min(Number(val), new Date().getFullYear()));
                                }
                            }}
                        />
                        <div className={`absolute top-9 left-0 w-full max-h-40 bg-white flex flex-col px-4 gap-1 ${!openDropdown.year ? 'hidden' : ''}
                            border border-gray-300 rounded-sm shadow-md overflow-y-auto z-20`}
                        >
                            {[...Array(70)].map((_, index) => {
                                const year = new Date().getFullYear() - index;
                                return (
                                    <div key={year} value={year} onClick={() => setYear(year)} 
                                        className="cursor-pointer border-b border-lesslessgrayColor w-full text-center"
                                    >
                                        {year}
                                    </div>
                                );
                            })}
                        </div>
                        <i className={`absolute right-2 top-1/2 transform -translate-y-1/2 fa-solid fa-chevron-down text-sm transition-transform duration-100 z-10 
                            ${openDropdown.year ? 'rotate-180' : 'rotate-0'}`}>
                        </i>
                    </div>
                    {dateError && <span className="absolute top-10 left-0 text-red-500 text-sm w-40">{dateError}</span>}
                </div>
            </form>
            {/* Avatar */}
            <div className="flex flex-col w-full h-auto min-h-32 items-center justify-start gap-4 py-6 select-none">
                <div className='w-26 h-26 rounded-full overflow-hidden mr-2 border cursor-pointer' 
                    onClick={() => alert('Chức năng thay đổi avatar đang được phát triển')}
                >
                    <img src={user?.avatarUrl || "https://as1.ftcdn.net/v2/jpg/07/24/59/76/1000_F_724597608_pmo5BsVumFcFyHJKlASG2Y2KpkkfiYUU.jpg"} alt="avatar"
                        className="user_avatar w-24 h-24 object-cover" 
                    />
                </div>
                <button className={`flex items-center justify-center bg-white text-black border border-black rounded-sm px-4 w-auto h-10
                        border-lessgrayColor text-sm font-normal
                    `}
                    onClick={() => alert('Chức năng thay đổi avatar đang được phát triển')}
                >
                    Thay đổi ảnh đại diện
                </button>         
                <div className="flex flex-col items-center justify-center">                    
                    <span className="text-moregrayTextColor text-base text-center px-4">
                        Dung lượng tối đa 1MB. 
                    </span>
                    <span className="text-moregrayTextColor text-xs text-center px-4">
                        Định dạng: .JPEG, .PNG, .JPG.
                    </span>
                </div>   
            </div>
        </div>
        <div className="flex w-full items-center justify-center ml-4 gap-2 mt-16">
            <PrimaryButton width="200px" text={"Lưu"} disabled={dateError !== ''}  onClick={() => handleSubmitForm()}>
                <div className={`absolute top-0 left-0 w-full h-full flex items-center justify-center
                    ${isLoading ? "bg-white/50" : "hidden"}`}
                >
                    <Spinner 
                        size={"30px"} 
                        stroke={"5px"}  
                        _hidden={isLoading ? "" : "hidden"}
                        color={"white"}
                    />
                </div>                        
            </PrimaryButton>
        </div>
    </div>
    )
}
export default UserProfile;