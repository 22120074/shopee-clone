import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import axios from "axios";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";
import AuthInitializer from "../src/contexts/AuthInitializer";
import SocketInitializer from "../src/contexts/SocketInitializer";

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
    <Provider store={store}>
      <AuthInitializer>
        <SocketInitializer>
          <App />
        </SocketInitializer>
      </AuthInitializer>
    </Provider>
  </GoogleOAuthProvider>,
);
