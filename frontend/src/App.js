import { BrowserRouter as Router, Routes } from "react-router-dom";
import { authRoutes } from "./routes/authRoute";
import { mainRoutes } from "./routes/mainRoute";
import { userRoutes } from "./routes/userRoute";
import { shopRoutes } from "./routes/shopRoute";
import ScrollToTop from "./components/ScrolltoTop";

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {authRoutes}
        {mainRoutes}
        {userRoutes}
        {shopRoutes}
      </Routes>
    </Router>
  );
};

export default App;
