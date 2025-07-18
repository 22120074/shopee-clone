import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App'; // SỬ DỤNG App - có chứa router
import axios from 'axios';
import { AuthProvider } from './contexts/AuthMode';

// Mặc định cho phép gửi cookie cho mọi request
axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // Bọc AuthProvider quanh App để cung cấp context cho toàn bộ ứng dụng
  <AuthProvider>
    <App />
  </AuthProvider>
);