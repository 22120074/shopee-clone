import { BrowserRouter as Router, Routes } from "react-router-dom";
import { authRoutes } from "./routes/authRoute";
import { mainRoutes } from "./routes/mainRoute";
import ScrollToTop from "./components/ScrolltoTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {authRoutes}
        {mainRoutes}
      </Routes>
    </Router>
  );
};

export default App;
