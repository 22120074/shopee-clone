import { BrowserRouter as Router, Routes } from 'react-router-dom';
import { appRoutes } from './routes/authRoute';

const App = () => (
  <Router>
    <Routes>
      {appRoutes}
    </Routes>
  </Router>
);

export default App;