import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { store } from "./app/store";
import { Provider } from "react-redux";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // Bọc Provider quanh App để cung cấp store Redux cho toàn bộ ứng dụng
  <Provider store={store}>
    <App />
  </Provider>
);
