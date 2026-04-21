KẾT QUẢ THỰC HIỆN

## Bài 1. Thiết lập nơi làm việc với frontend (React)

### 1.1 Tạo template frontend với React

Thực hiện trong thư mục `Lab04`:

```bash
npx create-react-app frontend
cd frontend
npm start
```

Kết quả: ứng dụng React chạy ở `http://localhost:3000`.

### 1.2 Cài đặt package hỗ trợ

Thực hiện trong `Lab04/frontend`:

```bash
npm install bootstrap react-router-dom react-bootstrap
```

Kết quả: đã cài Bootstrap (UI), React Router DOM (định tuyến), React-Bootstrap (component).

## Bài 2. Xây dựng Navigation Header bar

### 2.1 Tạo các component trong `src/components`

- `movies-list`: hiển thị danh sách phim
- `movie`: hiển thị chi tiết phim và review
- `add-review`: form thêm review
- `login`: trang đăng nhập

### 2.2-2.3 Tích hợp Navbar (React-Bootstrap) và cập nhật nội dung

- Logo: `Movie Reviews`
- Link 1: `Movies` (thay cho Home)
- Link 2: `Login/Logout` theo trạng thái người dùng (dùng `useState`)

Các route đã cấu hình trong `App.js`:

- `/movies`: danh sách phim
- `/movies/:id`: chi tiết phim
- `/movies/:id/review`: thêm review
- `/login`: đăng nhập

## Bài 3. Thiết lập các định tuyến cho các component

Trong `App.js` đã sử dụng `Routes` và `Route` (import từ `react-router-dom`) để định tuyến cho các component.

Các định tuyến theo yêu cầu:

- `/`: đến component `MoviesList`
- `/movies/:id/review`: đến component `AddReview`
- `/movies/:id`: đến component `Movie`
- `/login`: đến component `Login`
