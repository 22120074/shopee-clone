import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { authRoutes } from './routes/authRoute';
import { mainRoutes } from './routes/mainRoute';

const App = () => (
  <Router>
    <Routes>
      {authRoutes}
      {mainRoutes}
    </Routes>
  </Router>
);

export default App;