const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const dbPostgre = require('./models/PostgreSql/index');
const { errorHandler } = require('./middleware/errorHandle');

dotenv.config();

const app = express();

// Đọc cookie từ request
app.use(cookieParser());
// Đọc body JSON
app.use(express.json());

// 1. CORS: cho phép frontend (http://localhost:3000) gửi cookie
app.use(cors({
  origin: ['http://localhost:3000', 'http://192.168.137.1:3000'],
  credentials: true
}));

// Test API
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Xử lý lỗi chung
app.use(errorHandler);

// Public thư mục ảnh, video
app.use('/images', express.static('D:/Môn_Học/Shopee_Database/Images'));
app.use('/videos', express.static('D:/Môn_Học/Shopee_Database/Videos'));

const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

const productRoute = require('./routes/productRoute');
app.use('/product', productRoute);

const cartRoute = require('./routes/cartRoute');
app.use('/cart', cartRoute);

const userRoute = require('./routes/userRoute');
app.use('/user', userRoute);

const PORT = process.env.PORT || 5000;

Promise.all([
  mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }),
  dbPostgre.sequelize.sync({ force: false })
])
.then(() => {
  console.log('✅ All databases connected');
  app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
})
.catch(err => console.error('❌ Database connection failed:', err));