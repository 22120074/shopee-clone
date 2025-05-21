import './auth.css';
import React, { useState } from 'react';
import PrimaryButton from '../components/Button';
import { FcGoogle } from 'react-icons/fc'; // Icon Google đầy đủ màu
import { FaFacebook } from 'react-icons/fa'; // Icon Facebook đầy đủ màu
import { Link } from "react-router-dom";

function Login() {

  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Ngăn reload trang

    console.log('Dữ liệu submit:', formData);
    // Gọi API, validate, hoặc xử lý logic ở đây
  };

  return (
    <div className='auth_container'>
      <div className='self-start mb-4' style={{ fontSize: "20px"}}>
        Đăng nhập
      </div>

      <form onSubmit={handleSubmit} className='auth_form' >
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
          required
        />        
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
          required
        />

        <PrimaryButton height='40px' width='340px' text="Đăng nhập" type='submit' />
        <span className='block text-left w-full'><Link to="/" className='text-xs' style={{ color: "#0055AA" }}>Quên mật khẩu</Link></span>
      </form>

      <div className='flex items-center justify-center w-full' style={{ margin: '32px 0'}}>
        <div className='line'></div>
        <div style={{ font: '12px', color: '#DBDBDB', padding: '0 16px'}}>Hoặc</div>
        <div className='line'></div>
      </div>

      <div className='flex items-center justify-between w-full' style={{ gap: '16px'}}>
        <button className="flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center" 
            style={{ backgroundColor: 'white', color: 'black', height: '40px'}}
          >
          <FaFacebook className="w-5 h-5 mr-2" style={{ color: '#1877F2' }} />
          <span>Facebook</span>
        </button>

        <button className="flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center"
          >
          <FcGoogle className="w-5 h-5 mr-2" />
          <span>Google</span>
        </button>
      </div>

      <div className='text-sm text-[#BDBDBD]' style={{ marginTop: '16px'}}>
        Bạn mới biết đến Shopee?
        <Link to="/register" className="text-[#FA5130] font-semibold"> Đăng ký</Link>
      </div>

    </div>
  );
}

export default Login;