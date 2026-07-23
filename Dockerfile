# Stage 1: Build mã nguồn thành file tĩnh
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Nhúng file tĩnh vào Nginx alpine siêu nhẹ để chạy thực tế
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# Xóa file cấu hình mặc định cũ của Nginx đi
RUN rm /etc/nginx/conf.d/default.conf

# COPY file cấu hình tối ưu của Duy vào đúng vị trí của Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]