const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();

// Đọc cookie từ request
app.use(cookieParser());

// 1. CORS: cho phép frontend (http://localhost:3000) gửi cookie
app.use(cors({
  origin: process.env.FRONTEND_URL, // ví dụ 'http://localhost:3000'
  credentials: true                 // cho phép gửi cookie
}));

// Đọc body JSON
app.use(express.json());


// Test API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Xử lý lỗi chung
// app.use(errorHandler);

const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.log(err)
);
