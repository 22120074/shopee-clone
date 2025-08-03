import './auth.css';
import { useState } from 'react';
import PrimaryButton from '../components/Button';
import { FcGoogle } from 'react-icons/fc'; // Icon Google đầy đủ màu
import { FaFacebook } from 'react-icons/fa'; // Icon Facebook đầy đủ màu
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { login as loginService } from '../services/user.service';
import { getCurrentUser } from '../services/user.service';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState('');


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

  // const API_URL = process.env.REACT_APP_API_URL; // giờ sẽ là 'http://localhost:5000'

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError('');

    try {
      setLoading(true);
      // Gọi API đăng nhập
      await loginService({ phone: formData.phone, password: formData.password });
      // Nếu đăng nhập thành công, sẽ trả về thông tin người dùng 
      const currentUser = await getCurrentUser();
      // Nếu không có lỗi, cập nhật state auth
      if (currentUser) {
        dispatch(login(currentUser.data.dataUser));
      }
      // Lưu vào localStorage
      localStorage.setItem("user", JSON.stringify(currentUser.data.dataUser));
      // Chuyển hướng về trang chủ
      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      const msg = err.response?.data?.message || 'Lỗi kết nối. Vui lòng thử lại.';
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