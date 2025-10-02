# 🛒 Shopee Clone

![Project Status](https://img.shields.io/badge/Status-In%20Development-yellow)
![Frontend](https://img.shields.io/badge/Frontend-React-blue)
![Backend](https://img.shields.io/badge/Backend-Node.js-green)
![Database](https://img.shields.io/badge/Database-PostgreSQL-blue)
![Database](https://img.shields.io/badge/Database-MongoDB-green)
![Cache](https://img.shields.io/badge/Cache-Redis-red)
![Deployment](https://img.shields.io/badge/Deployment-Docker-blue)


Dự án **Shopee Clone** được xây dựng nhằm mô phỏng các tính năng cơ bản của sàn thương mại điện tử **Shopee**. Ứng dụng full-stack gồm **Frontend (React)** và **Backend (Node.js + Express)**, kết nối với cơ sở dữ liệu **PostgreSQL MongoDB**.

---

## 🎯 Mục tiêu dự án

- Học tập và thực hành phát triển ứng dụng web full-stack
- Áp dụng các công nghệ hiện đại trong phát triển web
- Hiểu rõ kiến trúc MVC và RESTful API
- Thực hành quản lý state với Redux Toolkit
- Triển khai tính năng xác thực và phân quyền người dùng

---

## 🚀 Công nghệ sử dụng

### Frontend
- **ReactJS 19.1.0** - Library JavaScript cho giao diện người dùng
- **Redux Toolkit 2.8.2** - Quản lý state toàn cục
- **React Router DOM 7.6.0** - Điều hướng SPA
- **TailwindCSS 3.4.17** - Framework CSS utility-first
- **Axios 1.9.0** - HTTP client cho API calls
- **GSAP 3.13.0** - Thư viện animation
- **HLS.js 1.6.12** - Video streaming (HLS format)
- **React Icons 5.5.0** - Bộ icon components

### Backend
- **Node.js & Express.js 5.1.0** - Runtime và web framework
- **Sequelize 6.37.7** - ORM cho PostgreSQL
- **PostgreSQL (pg 8.16.3)** - Cơ sở dữ liệu chính - Product
- **MongoDB & Mongoose 8.15.0** - Cơ sở dữ liệu phụ - User, Cart
- **Redis** - Cơ sở dữ liệu cache, session storage
- **JWT (jsonwebtoken 9.0.2)** - Xác thực người dùng
- **Bcrypt.js 3.0.2** - Mã hóa mật khẩu
- **Google OAuth 2.0** - Đăng nhập bằng Google
- **CORS 2.8.5** - Cross-Origin Resource Sharing
- **Cookie Parser 1.4.7** - Xử lý cookies

### DevOps & Tools
- **Docker & Docker Compose** - Containerization và orchestration
- **Nodemon 3.1.10** - Auto-restart server khi development
- **PostCSS 8.5.6** - CSS post-processor
- **Autoprefixer 10.4.21** - Tự động thêm CSS prefixes

---

## ⚡ Tính năng đã hoàn thành

### 🔐 Xác thực & Phân quyền
- [x] Đăng ký tài khoản mới
- [x] Đăng nhập với email/password
- [x] Đăng nhập với Google OAuth 2.0
- [x] JWT authentication
- [x] Middleware xác thực
- [x] Quản lý session và cookies

### 🛍️ Sản phẩm
- [x] Hiển thị danh sách sản phẩm
- [x] Chi tiết sản phẩm với hình ảnh
- [x] Video preview sản phẩm (HLS streaming)
- [x] Phân trang sản phẩm

### 🛒 Giỏ hàng
- [x] Thêm sản phẩm vào giỏ hàng
- [x] Cập nhật số lượng sản phẩm
- [x] Xóa sản phẩm khỏi giỏ hàng
- [x] Tính tổng giá trị đơn hàng
- [x] Quản lý giỏ hàng với Redux

### ⭐ Đánh giá & Review
- [x] Hệ thống đánh giá sao
- [x] Upload hình ảnh review
- [x] Upload video review
- [x] Hiển thị danh sách đánh giá

### 👤 Quản lý người dùng
- [x] Profile người dùng

### 🎨 Giao diện & UX
- [x] Responsive design với TailwindCSS - Mobile, Ipad, PC
- [x] Loading skeletons - List of user comment
- [x] Toast notifications - in Cart, Product Layout
- [x] Image preview component
- [x] Carousel slide cho hình ảnh
- [x] Smooth animations với GSAP
- [x] Scroll to top functionality

---

## 🚧 Tính năng đang và sẽ phát triển

- [ ] Quản lý đơn hàng
- [ ] Chat với người bán
- [ ] Thông báo real-time
- [ ] Admin dashboard
- [ ] Báo cáo thống kê
- [ ] Tối ưu SEO

---

## 📂 Cấu trúc dự án

```
shopee-clone/
│
├── 📁 backend/                     # Server API (Node.js + Express)
│   ├── 📁 config/                 # 
│   ├── 📁 controllers/            # Logic xử lý requests
│   │   ├── authController.js           # Xác thực người dùng
│   │   ├── authGG-Fb.js                # OAuth Google/Facebook
│   │   ├── cartController.js           # Quản lý giỏ hàng
│   │   └── productController.js        # Quản lý sản phẩm      
│   ├── 📁 middleware/             # Middleware functions
│   │   ├── authMiddleware.js           # Xác thực JWT
│   │   └── errorHandle.js              # Xử lý lỗi
│   ├── 📁 models/                 # Database models
│   │   ├── Cart.js                     # Model giỏ hàng (MongoDB)
│   │   ├── User.js                     # Model người dùng (MongoDB)
│   │   └── 📁 PostgreSql/              # Models PostgreSQL
│   │       ├── product.model.js        # Sản phẩm
│   │       ├── rating.model.js         # Đánh giá
│   │       ├── stock.model.js          # Kho hàng
│   │       └── ...
│   ├── 📁 routes/                 # API routes
│   │   ├── authRoute.js                # Routes xác thực
│   │   ├── cartRoute.js                # Routes giỏ hàng
│   │   └── productRoute.js             # Routes sản phẩm
│   ├── 📁 services/               # Business logic
│   │   ├── cart.service.js             # Logic giỏ hàng
│   │   └── product.service.js          # Logic sản phẩm
│   ├── server.js                 # Entry point
│   └── package.json              # Dependencies
│
├── 📁 frontend/                   # Client (React)
│   ├── 📁 public/                # Static files
│   ├── 📁 src/
│   │   ├── 📁 components/        # Reusable components
│   │   │   ├── Header.jsx              # Header navigation
│   │   │   ├── Footer.jsx              # Footer component
│   │   │   ├── Pagination.jsx          # Phân trang
│   │   │   ├── 📁 cartComponents/      # Components giỏ hàng
│   │   │   ├── 📁 productComponents/   # Components sản phẩm
│   │   │   └── 📁 skeletons/           # Loading skeletons
│   │   ├── 📁 pages/             # Page components
│   │   │   ├── home.jsx                # Trang chủ
│   │   │   ├── 📁 _auth/               # Trang xác thực
│   │   │   ├── 📁 _cart/               # Trang giỏ hàng
│   │   │   ├── 📁 _product/            # Trang sản phẩm
│   │   │   └── 📁 _user/               # Trang người dùng
│   │   ├── 📁 features/          # Redux slices
│   │   │   ├── 📁 auth/                # Auth state
│   │   │   └── 📁 cart/                # Cart state
│   │   ├── 📁 services/          # API services
│   │   ├── 📁 hooks/             # Custom hooks
│   │   ├── 📁 utils/             # Utility functions
│   │   └── App.js                # Main App component
│   └── package.json              # Dependencies
│
├── docker-compose.yaml           # Docker Compose configuration
├── script.sql                    # Database sample data
├── scriptRating.sql              # Rating sample data
├── client_secret_*.json          # Google OAuth credentials
└── README.md                     # Documentation

```

---

## �️ Cơ sở dữ liệu

### PostgreSQL (Chính)
- **Products**: Thông tin sản phẩm, hình ảnh, video
- **Detail**: Thông tin chi tiết sản phẩm
- **Ratings**: Đánh giá và review
- **Stock**: Quản lý kho hàng
- **Attributes**: Thuộc tính sản phẩm
- **Like**: Lượt thích 
- **Sold**: Lượt bán
- **Ảnh sản phẩm**: Ảnh chi tiết của sản phẩm
- **Ảnh - Video đánh giá**: Ảnh và video của đánh giá

### MongoDB (Phụ)
- **Users**: Thông tin đăng nhập và tài khoản người dùng
- **Carts**: Giỏ hàng

### Redis (Cache)
- **Cache**: Cache dữ liệu thường xuyên truy cập

---

## �📦 Cài đặt và chạy dự án

### Yêu cầu hệ thống
- Node.js >= 16.0.0
- PostgreSQL >= 12.0
- MongoDB >= 4.4
- Redis >= 4.0
- Docker & Docker Compose (tùy chọn)
- npm >= 8.0.0

### 1. Clone repository
```bash
git clone https://github.com/22120074/shopee-clone.git
cd shopee-clone
```

### 2. Cài đặt Backend
```bash
cd backend
npm install
```

### 3. Cài đặt Frontend
```bash
cd ../frontend
npm install
```

### 4. Chạy ứng dụng

#### Development mode (Manual)
```bash
# Terminal 1: Backend
cd backend
node server.js

# Terminal 2: Frontend
cd frontend
npm start
```

#### Production mode với Docker
```bash

# Build lại images trước khi chạy
docker-compose up --build -d

```

## 🔧 Cấu hình môi trường

### Backend (.env)
```env
PORT=5000
MONGO_URI=
JWT_SECRET=
JWT_REFRESH_SECRET=
FRONTEND_URL=http://localhost:3000
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
HOST=localhost
PORT=3000
REACT_APP_GOOGLE_CLIENT_ID=
```

---

## 🐳 Docker Deployment

### Services được triển khai:
- **Redis**: Cache & Session storage (Port 6379)

### Docker Commands:
```bash
# Khởi động tất cả services
docker-compose up -d

# Rebuild images và khởi động
docker-compose up --build -d

```

---

## 📊 Tiến độ dự án

### ✅ Hoàn thành - Nếu có lỗi thì sẽ xem lại sau
- Authentication system
- Product management
- Cart functionality
- Rating system
- Responsive UI
- State management
- Redis integration (Cache & Session)
- Docker deployment - Redis

### 🔄 Đang phát triển
- Spinner Login/Register
- Order management
- Admin features

### ⏳ Kế hoạch (5%)
- Real-time chat
- Advanced analytics
- Performance optimization

---

## 🎨 Screenshots

*[Thêm screenshots của ứng dụng ở đây]*

---

## 👨‍💻 Tác giả

**Sinh viên**: 22120074  - Đỗ Nhật Duy
**Repository**: [shopee-clone](https://github.com/22120074/shopee-clone)

---

## 📞 Liên hệ
doduy7924zz@gmail.com
0837079950
---

*Cập nhật lần cuối: 03/10/2025*
