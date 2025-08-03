import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { authRoutes } from './routes/authRoute';
import { mainRoutes } from './routes/mainRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';

const App = () => {
  const dispatch = useDispatch();

  // Kiểm tra localStorage để khôi phục người dùng đã đăng nhập
  // và dispatch action login nếu có
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      dispatch(login(savedUser));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {authRoutes}
        {mainRoutes}
      </Routes>
    </Router>
  );
};

export default App;