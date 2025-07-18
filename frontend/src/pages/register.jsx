import './auth.css';
import React, { useState } from 'react';
import PrimaryButton from '../components/Button';
import { FcGoogle } from 'react-icons/fc'; // Icon Google đầy đủ màu
import { FaFacebook } from 'react-icons/fa'; // Icon Facebook
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { register } from '../services/user.service'; // Import hàm đăng ký từ service

function Register() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    confirmPassword: ''
  });

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

  // Hàm kiểm tra tính hợp lệ của form
  const validateForm = () => {
    const newErrors = {};

    // Kiểm tra số điện thoại
    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^\d{9,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    // Kiểm tra mật khẩu
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }

    // Kiểm tra xác nhận mật khẩu
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Vui lòng xác nhận mật khẩu';
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }

    setErrors(newErrors);

    // Trả về true nếu không có lỗi
    return Object.keys(newErrors).length === 0;
  };

  // Hàm xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError('');
    setSuccessMsg('');

    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      const response = await register({
        phone: formData.phone,
        password: formData.password
      });

      // 4. Xử lý kết quả thành công
      setLoading(false);
      setSuccessMsg(response.data.message || 'Đăng ký thành công!');
      // 5. Chuyển hướng (ví dụ về trang Login sau 1.5s)
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      setLoading(false);
      // 6. Xử lý lỗi
      if (err.response && err.response.data && err.response.data.message) {
        setServerError(err.response.data.message);
      } else {
        setServerError('Lỗi kết nối. Vui lòng thử lại.');
      }
    }
  };

  return (
    <div className='auth_container'>
      {/* Phần tiêu đề */}
      <div className='self-start mb-4' style={{ fontSize: "20px"}}>
        Đăng ký
      </div>
      {/* Phần form đăng ký */}
      <form onSubmit={handleSubmit} className='auth_form' >
        <div className='relative w-full'>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Số điện thoại"
            className="border border-gray-300 px-4 py-2 mb-4 w-full rounded"
            required
          />
          {/* Thông báo lỗi nếu có */}
          {errors.phone && (
            <p className="absolute text-red-500 text-xs mt-1 left-0" style={{ top: 'calc(39px)', left: '0' }}>
              {errors.phone}
            </p>
          )}
        </div>
        {/* Phần nhập mật khẩu */}
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Mật khẩu"
          className="border border-gray-300 px-4 py-2 mb-4 w-full rounded check_password"
          required
        />
        {/* Phần nhập lại mật khẩu */}
        <div className='relative w-full'>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            className="border border-gray-300 px-4 py-2 mb-5 w-full rounded check_password"
            required
          />
          {/* Thông báo lỗi nếu có */}
          {errors.confirmPassword && (
            <p className="absolute text-red-500 text-xs mt-1 left-0" style={{ top: 'calc(39px)', left: '0' }}>
              {errors.confirmPassword}
            </p>
          )}
        </div>
        
        <PrimaryButton height='40px' width='340px' text="Đăng ký" type='submit' />
      </form>
      {/* Phần đường kẻ */}
      <div className='flex items-center justify-center w-full' style={{ margin: '32px 0'}}>
        <div className='line'></div>
        <div style={{ font: '12px', color: '#DBDBDB', padding: '0 16px'}}>Hoặc</div>
        <div className='line'></div>
      </div>
      {/* Phần đăng ký bằng tài khoản khác */}
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
      {/* Nếu đã có tài khoản */}
      <div className='text-sm text-[#BDBDBD]' style={{ marginTop: '16px'}}>
        Bạn đã có tài khoản?
        <Link to="/login" className="text-[#FA5130] font-semibold"> Đăng nhập</Link>
      </div>

    </div>
  );
}

export default Register;