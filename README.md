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
- [x] Hiển thị danh sách phân loại và kích thước nếu có
- [x] Chi tiết sản phẩm với hình ảnh
- [x] Thông tin chi tiết sản phẩm
- [x] Tăng giảm số lượng sản phẩm
- [x] Giá tiền thay đổi tùy theo phân loại
- [x] Thông báo lỗi nếu có
- [x] Thêm sản phẩm vào giỏ hàng

### 🛒 Giỏ hàng
- [x] Cập nhật số lượng sản phẩm
- [x] Xóa sản phẩm khỏi giỏ hàng
- [x] Tính tổng giá trị đơn hàng
- [x] Quản lý giỏ hàng với Redux

### ⭐ Đánh giá & Review
- [x] Hiển thị danh sách đánh giá
    - [x] Hiển thị - Điểm, Nội dung, Hình ảnh, Video
    - [x] Hiển thị - Ngày, Tên, Phân loại hàng
    - [x] Thanh chứa Video và Hình ảnh
    - [x] Video - HLS Streaming - File .m3u8

### 👤 Quản lý người dùng
- [x] Profile người dùng
    - [x] Email - Vertify & Update

### 🎨 Giao diện & UX
- [x] Responsive design với TailwindCSS - Mobile, Ipad, PC
- [x] Loading Skeletons - List of user comments
- [x] Toast Notifications - In Cart, Product Layout - Component
- [x] Image Preview - Thanh hình ảnh & Ảnh chính - Component
- [x] Image Revealer - Component
- [x] Carousel Slide - Hình ảnh - Responsive - Component
- [x] Carousel Slide - Danh mục - Responsive
- [x] Pagination - In review comments - Responsive - Component
- [x] Smooth animations với GSAP
- [x] Scroll to top - Component
- [x] Animation hiện mượt mà ở Sidebar - In User Layout 
- [x] Spinner Button - Component
- [x] Step Progress - Linh hoạt theo --var(Steps []) - Component

---

## 🚧 Tính năng đang và sẽ phát triển

- [ ] Giao diện trang thông tin người dùng
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
├── 📁 backend/                          # Server API (Node.js + Express)
│   ├── 📁 config/                       # Cấu hình services
│   │   └── redisConfig.js                   # Cấu hình Redis client
│   │
│   ├── 📁 controllers/                  # Logic xử lý requests
│   │   ├── authController.js                # Xác thực, đăng ký, đăng nhập
│   │   ├── authGG-Fb.js                     # OAuth Google/Facebook
│   │   ├── cartController.js                # CRUD giỏ hàng
│   │   └── productController.js             # Quản lý sản phẩm
│   │   └── userController.js                # Quản lý người dùng
│   │
│   ├── 📁 middleware/                   # Middleware functions
│   │   ├── authMiddleware.js                # Xác thực JWT token
│   │   └── errorHandle.js                   # Error handling middleware
│   │
│   ├── 📁 models/                       # Database models
│   │   ├── Cart.js                          # Schema giỏ hàng (MongoDB)
│   │   ├── User.js                          # Schema người dùng (MongoDB)
│   │   │
│   │   └── 📁 PostgreSql/                   # Models PostgreSQL
│   │       ├── index.js                        # Khởi tạo Sequelize connection
│   │       ├── product.model.js                # Model sản phẩm
│   │       ├── detail.model.js                 # Model chi tiết sản phẩm
│   │       ├── attribute.model.js              # Model thuộc tính
│   │       ├── rating.model.js                 # Model đánh giá
│   │       ├── stock.model.js                  # Model kho hàng
│   │       ├── sold.model.js                   # Model lượt bán
│   │       ├── like.model.js                   # Model lượt thích
│   │       ├── image_product.model.js          # Model hình ảnh sản phẩm
│   │       │
│   │       └── 📁 Rating/                   # Models đánh giá
│   │           ├── image.model.js              # Hình ảnh review
│   │           └── video.model.js              # Video review
│   │
│   ├── 📁 routes/                       # API routes
│   │   ├── authRoute.js                     # Routes xác thực
│   │   ├── cartRoute.js                     # Routes giỏ hàng
│   │   └── productRoute.js                  # Routes sản phẩm
│   │   └── userRoute.js                     # Routes người dùng
│   │
│   ├── 📁 services/                     # Business logic layer
│   │   ├── cart.service.js                  # Service giỏ hàng
│   │   └── product.service.js               # Service sản phẩm
│   │   └── user.service.js                  # Service người dùng
│   │
│   ├── Dockerfile                       # Docker image cho backend
│   ├── server.js                        # Server.js
│   └── package.json                     # Dependencies backend
│
├── 📁 frontend/                         # Client Application (React)
│   ├── 📁 public/                       # Static files
│   │   ├── index.html                       # HTML template
│   │   ├── manifest.json                    # PWA manifest
│   │   └── robots.txt                       # SEO robots
│   │
│   ├── 📁 src/
│   │   ├── 📁 app/                      # Redux configuration
│   │   │   └── store.js                     # Redux store setup
│   │   │
│   │   ├── 📁 assets/                   # Static assets
│   │   │   ├── Empty-bro.svg                # Empty state illustration
│   │   │   └── shopee.svg                   # Shopee logo
│   │   │
│   │   ├── 📁 components/               # Reusable components
│   │   │   ├── Header.jsx                   # Header
│   │   │   ├── Footer.jsx                   # Footer
│   │   │   ├── SideBar.jsx                  # Sidebar
│   │   │   ├── Button.jsx                   # Button component
│   │   │   ├── NormalButton.jsx             # Normal button component
│   │   │   ├── Pagination.jsx               # Pagination component
│   │   │   ├── CarouselSlide.jsx            # Carousel slider component
│   │   │   ├── ImagePreview.jsx             # Image preview
│   │   │   ├── VideoHls.jsx                 # HLS video player
│   │   │   ├── ScrolltoTop.jsx              # Scroll to top
│   │   │   ├── ggButton.jsx                 # Google login button
│   │   │   ├── fbButton.jsx                 # Facebook login button
│   │   │   │
│   │   │   ├── 📁 animations/               # Animation components
│   │   │   │   └── ImageReveal.jsx          # Image reveal animation
│   │   │   │
│   │   │   ├── 📁 cartComponents/           # Cart components
│   │   │   │   ├── headerCart.jsx              # Cart header
│   │   │   │   ├── productList.jsx             # Cart product list
│   │   │   │   ├── footerCart.jsx              # Cart footer/total
│   │   │   │   └── ...                         # More components
│   │   │   │
│   │   │   ├── 📁 productComponents/        # Product components
│   │   │   │   ├── dataDetailProduct.jsx       # Product detail data
│   │   │   │   ├── dataLeft.jsx                # Left section data
│   │   │   │   ├── dataRating.jsx              # Rating data display
│   │   │   │   └── ...                         # More components
│   │   │   │
│   │   │   └── 📁 skeletons/                # Loading skeletons
│   │   │
│   │   ├── 📁 pages/                    # Page components
│   │   │   ├── home.jsx                     # Homepage
│   │   │   ├── TrendingProducts.jsx         # Trending products page
│   │   │   ├── 📁 _auth/                    # Authentication pages
│   │   │   ├── 📁 _cart/                    # Cart pages
│   │   │   ├── 📁 _product/                 # Product pages
│   │   │   ├── 📁 _user/                    # User profile pages
│   │   │   └── 📁 _catagory/                # Category pages
│   │   │
│   │   ├── 📁 features/                 # Redux slices
│   │   │   ├── 📁 auth/                     # Auth state management
│   │   │   └── 📁 cart/                     # Cart state management
│   │   │
│   │   ├── 📁 services/                 # API service layer
│   │   │   ├── auth.service.js              # Auth API calls
│   │   │   ├── auth.helper.js               # Auth helper functions
│   │   │   ├── cart.service.js              # Cart API calls
│   │   │   ├── product.service.js           # Product API calls
│   │   │   └── user.service.js              # User API calls
│   │   │
│   │   ├── 📁 hooks/                    # Custom React hooks
│   │   │   ├── useIsWindow.jsx              # Window size hook
│   │   │   └── useToastQueue.jsx            # Toast queue hook
│   │   │
│   │   ├── 📁 layouts/                  # Layout components
│   │   │   ├── MainLayout.jsx               # Main app layout
│   │   │   └── userLayout.jsx               # User profile layout
│   │   │
│   │   ├── 📁 routes/                   # Route configurations
│   │   │   ├── mainRoute.jsx                # Main routes
│   │   │   ├── authRoute.jsx                # Auth routes
│   │   │   └── userRoute.jsx                # User routes
│   │   │
│   │   ├── 📁 contexts/                 # React contexts - Đã thay bằng Redux
│   │   │   └── AuthMode.jsx                 # Auth mode context
│   │   │
│   │   ├── 📁 css/                      # CSS
│   │   │
│   │   ├── 📁 utils/                    # Utility functions
│   │   │   ├── numberCheck.js               # Number validation
│   │   │   ├── numberFormat.js              # Number formatting
│   │   │   └── stringFormat.js              # String formatting
│   │   │
│   │   ├── App.js                       # Main App component
│   │   ├── App.css                      # App styles
│   │   ├── App.test.js                  # App tests
│   │   ├── index.js                     # Entry point
│   │   └── index.css                    # Global styles
│   │
│   ├── tailwind.config.js               # TailwindCSS configuration
│   ├── postcss.config.js                # PostCSS configuration
│   ├── product-sample.json              # Sample product data
│   └── package.json                     # Dependencies frontend
│
├── docker-compose.yaml                  # Docker Compose orchestration
├── script.sql                           # PostgreSQL sample data
├── scriptRating.sql                     # Rating sample data
├── client_secret_*.json                 # Google OAuth credentials
└── README.md                            # Project documentation

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
REDIS_URL=
EMAIL_USER=
EMAIL_PASS=
EMAIL_PASS_APP=
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

## 🎨 Screenshots

*[Thêm screenshots của ứng dụng ở đây]*
![Home](https://github.com/user-attachments/assets/a123321d-3bf1-489e-8582-9d20b6976619)
![Product_Page](https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579950-90eeedc8-a803-403d-abf8-edcc6844fca8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251005T191258Z&X-Amz-Expires=300&X-Amz-Signature=6f35310f70403507721fd693720fdada27949356f6eb2c8c1d1c82a2a05aedb0&X-Amz-SignedHeaders=host)
![Cart_Page](https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579899-79555d53-1567-4738-aa67-59df73a26469.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251005T191220Z&X-Amz-Expires=300&X-Amz-Signature=2522f4a8efc4b4c30f880c38ecf5730545b6396cb7602904fc83d8bf0d968959&X-Amz-SignedHeaders=host)
![Login_Page](https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579741-55f3cdce-8c0a-41cf-b767-a81855f34464.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251005T190940Z&X-Amz-Expires=300&X-Amz-Signature=004ab61e848f9904aab23ad8d96d3a6b7a5708c7ea6e143d7e698ab53b25cd68&X-Amz-SignedHeaders=host)
![Register_Page](https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579819-4e8bd08d-2dbf-43e1-a76e-6a89d4ffb3a0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAVCODYLSA53PQK4ZA%2F20251005%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251005T191105Z&X-Amz-Expires=300&X-Amz-Signature=2c28f796bd5d68349522b2edfb05949a6d0a6b18d33f8e6a60783f07c3c4e5ed&X-Amz-SignedHeaders=host)

<p align="center">
  <img src="https://github.com/user-attachments/assets/a123321d-3bf1-489e-8582-9d20b6976619" alt="Home" width="400">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579950-90eeedc8-a803-403d-abf8-edcc6844fca8.png" alt="Product Page" width="400">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579899-79555d53-1567-4738-aa67-59df73a26469.png" alt="Cart Page" width="400">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579741-55f3cdce-8c0a-41cf-b767-a81855f34464.png" alt="Login Page" width="400">
  <img src="https://github-production-user-asset-6210df.s3.amazonaws.com/152791183/497579819-4e8bd08d-2dbf-43e1-a76e-6a89d4ffb3a0.png" alt="Register Page" width="400">
</p>


---

## 👨‍💻 Tác giả

**Sinh viên**: 22120074  - Đỗ Nhật Duy
**Repository**: [shopee-clone](https://github.com/22120074/shopee-clone)

---

## 📞 Liên hệ
**Email:** doduy7924zz@gmail.com
**Số điện thoại:** 0837079950
---

*Cập nhật lần cuối: 06/10/2025*
