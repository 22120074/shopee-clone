# 1. Chọn Node.js base image
FROM node:20-alpine

# 2. Tạo thư mục app trong container
WORKDIR /app

# 3. Copy package.json & package-lock.json (nếu có)
COPY package*.json ./

# 4. Cài dependencies
RUN npm install

# 5. Copy toàn bộ source code vào container
COPY . .

# 6. Mở port backend
EXPOSE 5000

# 7. Lệnh start server
CMD ["node", "server.js"]
