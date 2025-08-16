import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { authRoutes } from './routes/authRoute';
import { mainRoutes } from './routes/mainRoute';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/auth/authSlice';

const App = () => {

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