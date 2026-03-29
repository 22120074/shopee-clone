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
- [x] Tạo sản phẩm mới lên sàn điện tử

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
  - [x] Phone - Update
  - [x] Profile - Update
  - [x] Avatar - Update - Url, File Object

### 🎨 Giao diện & UX

- [x] Responsive design với TailwindCSS - Mobile, Ipad, PC
- [x] Loading Skeletons - List of user comments
- [x] StackBar Notifications - In Cart, Product, User Layout - Component
- [x] Image Preview - Thanh hình ảnh & Ảnh chính - Component
- [x] Image Revealer - Chuyển hình ảnh 1 --> 2 với GSAP - Component
- [x] Carousel Slide - Hình ảnh - Responsive - Component
- [x] Carousel Slide - Danh mục - Responsive
- [x] Pagination - In review comments - Responsive - Component
- [x] Smooth animations với GSAP - Text, ImageRevealer
- [x] Scroll to top - Component
- [x] Animation đóng mở mượt mà ở [Sidebar - In User Layout], [Input File - In User Profile], [Cart, User Icon - In Header]
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
│   │   │   │   └── ...                         # More components
│   │   │   │
│   │   │   ├── 📁 productComponents/        # Product components
│   │   │   │   ├── dataDetailProduct.jsx       # Product detail data
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
│   │   │   ├── 📁 _user/                    # User pages
│   │   │       ├── 📁 _notification/             # Notigication pages
│   │   │       ├── 📁 _order/                    # Order pages
│   │   │       └── 📁 _account/                  # Profile pages
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

# Build lại images trước khi chạy backend
docker-compose up -d --build backend
docker-compose logs -f backend

# Build lại images trước khi chạy db
docker-compose up -d --build db
docker-compose logs -f db

# Vào redis
docker exec -it my-redis redis-cli
MONITOR

# Show tiến trình docker
docker ps

# Show tiến trình db
docker exec -it shoppe-db psql -U postgres -d Shoppe_DB -c "\dt *.*"

ssh azureuser@20.197.21.221
ssh -i <path_to_key> azureuser@IP
ssh -i D:\Mon_Hoc\BE.Redis_key.pem azureuser@20.197.21.221

exit
clear

cd ~/my-app

sudo systemctl restart nginx
sudo nginx -t

```

Ngân hàng: NCB

Số thẻ: 9704198526191432198

Tên chủ thẻ: NGUYEN VAN A

Ngày phát hành: 07/15

Mật khẩu OTP: 123456 (Nhập sau khi bấm xác nhận thanh toán)

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

### 💻 Giao diện Desktop (PC)

|                Trang chủ                |                 Chi tiết sản phẩm                  |            Giỏ hàng             |               Trang cá nhân                |
| :-------------------------------------: | :------------------------------------------------: | :-----------------------------: | :----------------------------------------: |
| ![Homepage PC](picture/homepage_pc.png) | ![Product Detail PC](picture/productdetail_pc.png) | ![Cart PC](picture/cart_pc.png) | ![My Profile PC](picture/myprofile_pc.png) |

### 📟 Giao diện Tablet

|                    Trang chủ                    |                     Chi tiết sản phẩm                      |
| :---------------------------------------------: | :--------------------------------------------------------: |
| ![Homepage Tablet](picture/homepage_tablet.png) | ![Product Detail Tablet](picture/productdetail_tablet.png) |

### 📱 Giao diện Mobile (Phone)

|                   Trang chủ                   |                    Chi tiết sản phẩm                     |
| :-------------------------------------------: | :------------------------------------------------------: |
| ![Homepage Phone](picture/homepage_phone.png) | ![Product Detail Phone](picture/productdetail_phone.png) |

### 🔐 Xác thực & Đăng nhập

|                      Giao diện Đăng nhập / Đăng ký                      |
| :---------------------------------------------------------------------: |
| <img src="picture/login_register.png" alt="Login Register" width="600"> |

---

## 👨‍💻 Tác giả

**Sinh viên**: 22120074 - Đỗ Nhật Duy
**Repository**: [shopee-clone](https://github.com/22120074/shopee-clone)

---

_Cập nhật lần cuối: 06/10/2025_
