import './auth.css';
import React, { useState, useContext } from 'react';
import PrimaryButton from '../components/Button';
import { FcGoogle } from 'react-icons/fc'; // Icon Google đầy đủ màu
import { FaFacebook } from 'react-icons/fa'; // Icon Facebook đầy đủ màu
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthMode';

function Login() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const { login } = useContext(AuthContext);


  const [formData, setFormData] = useState({
    phone: '',
    password: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    password: '',
  });

  // Hàm xử lý post của form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    setErrors(prev => ({
      ...prev,
      [name]: ''
    }));
  };

  const API_URL = process.env.REACT_APP_API_URL; // giờ sẽ là 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError('');

    try {
      setLoading(true);

      await login({ phone: formData.phone, password: formData.password });

      setLoading(false);
      
      // // Nếu server trả token, bạn có thể lưu vào localStorage hoặc Context
      // localStorage.setItem('token', res.data.token);
      // Đã có cockie nên không cần lưu token nữa

      // console.log(res.data);

      // Chuyển trang sau khi login thành công
      navigate('/');
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Lỗi kết nối. Vui lòng thử lại.';
      // Nếu lỗi xác thực (401) thì hiển thị dưới form
      setServerError(msg);
    }

  };

  return (
    <div className='auth_container'>
      {/* Phần tiêu đề */}
      <div className='self-start mb-4' style={{ fontSize: "20px"}}>
        Đăng nhập
      </div>
      {/* Phần form */}
      <form onSubmit={handleSubmit} className='auth_form' >
        {/* Input số điện thoại */}
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Số điện thoại"
          className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
          required
        />     
        {/* Input mật khẩu */}
        <div className='relative w-full'>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Mật khẩu"
            className="border border-gray-300 px-4 py-2 mb-5 w-full rounded"
            required
          />
          {/* Hiển thị lỗi nếu có */}
          {serverError && (
            <p className="absolute text-red-500 text-xs mt-1 left-0" style={{ top: 'calc(39px)', left: '0' }}>
              Lỗi tài khoản hoặc mật khẩu
            </p>
          )}
        </div>

        <PrimaryButton height='40px' width='340px' text="Đăng nhập" type='submit' />
        <span className='block text-left w-full'><Link to="/" className='text-xs' style={{ color: "#0055AA" }}>Quên mật khẩu</Link></span>
      </form>
      {/* Phần đường kẻ ngăn cách */}
      <div className='flex items-center justify-center w-full' style={{ margin: '32px 0'}}>
        <div className='line'></div>
        <div style={{ font: '12px', color: '#DBDBDB', padding: '0 16px'}}>Hoặc</div>
        <div className='line'></div>
      </div>
      {/* Phần đăng nhập bằng tài khoản khác */}
      <div className='flex items-center justify-between w-full' style={{ gap: '16px'}}>
        <button className="flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center" 
            style={{ backgroundColor: 'white', color: 'black', height: '40px'}}
        >
          <FaFacebook className="w-5 h-5 mr-2" style={{ color: '#1877F2' }} />
          <span>Facebook</span>
        </button>
        <button className="flex items-center border border-gray-300 rounded px-4 py-2 flex-1 justify-center">
          <FcGoogle className="w-5 h-5 mr-2" />
          <span>Google</span>
        </button>
      </div>
      {/* Phần chưa có tài khoản */}
      <div className='text-sm text-[#BDBDBD]' style={{ marginTop: '16px'}}>
        Bạn mới biết đến Shopee?
        <Link to="/register" className="text-[#FA5130] font-semibold"> Đăng ký</Link>
      </div>
    </div>
  );
}

export default Login;