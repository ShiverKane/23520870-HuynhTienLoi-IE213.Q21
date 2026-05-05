KẾT QUẢ THỰC HIỆN

## Bài 1. Kết nối tới Backend

### 1.1 Cài đặt axios

Thực hiện trong `Lab05/frontend`:

```bash
npm install axios
```

### 1.2-1.3 Tạo MovieDataService và các lời gọi dịch vụ tới backend

Đã tạo lớp dịch vụ `MovieDataService` tại:

- `src/services/movies.js`

Các hàm đã triển khai (dùng axios) tương ứng với endpoint backend:

- `getAll(params)` → `GET /api/v1/movies` (hỗ trợ query `title`, `rated`, `page`, `moviesPerPage`)
- `get(id)` → `GET /api/v1/movies/id/:id`
- `createReview(data)` → `POST /api/v1/movies/review`
- `updateReview(data)` → `PUT /api/v1/movies/review`
- `deleteReview(data)` → `DELETE /api/v1/movies/review`
- `getRatings()` → `GET /api/v1/movies/ratings`

## Bài 2. Xây dựng MoviesList Component

### 2.1 Tạo các biến trạng thái

Trong `MoviesList` đã tạo state bằng `useState()`:

- `movies`
- `searchTitle`
- `searchRating`
- `ratings`

### 2.2 retrieveMovies() và retrieveRatings() + useEffect()

- `retrieveMovies()` gọi `MovieDataService.getAll()` để lấy danh sách phim
- `retrieveRatings()` gọi `MovieDataService.getRatings()` để lấy danh sách ratings
- `useEffect()` gọi cả 2 hàm sau khi UI render lần đầu

### 2.3 Tạo 2 search form (title, rating)

- Form tìm theo title: gọi `getAll({ title })`
- Form lọc theo rating: gọi `getAll({ rated })`

### 2.4 Hiển thị các movie bằng Card (React-Bootstrap)

- Danh sách movie được render dạng lưới `<Card>` (có poster nếu có), kèm các thông tin cơ bản như `title`, `rated`.
- Nút `View Reviews` điều hướng tới trang chi tiết movie theo route `/movies/:id`.

### 2.5 Hiện thực findByTitle() và findByRating()

- `findByTitle()` gọi `getAll({ title })` để tìm phim theo Title
- `findByRating()` gọi `getAll({ rated })` để lọc theo Rating

## Bài 3. Hiển thị thông tin trang movie khi nhấn vào “View Reviews”

### 3.1 Thiết lập state movie trong component Movie

Trong `./frontend/src/components/movie.js` đã tạo biến trạng thái `movie` để lưu thông tin chi tiết:

- `id`, `title`, `rated`
- `reviews` (mảng review)

### 3.2 Xây dựng phương thức getMovie() gọi MovieDataService.get()

- `getMovie(movieId)` gọi `MovieDataService.get(movieId)` để lấy dữ liệu theo endpoint `GET /api/v1/movies/id/:id`
- Sau khi nhận dữ liệu, cập nhật state `movie` (bao gồm `reviews`)

### 3.3 Trang trí JSX hiển thị thông tin movie + danh sách reviews

- Hiển thị poster và thông tin cơ bản (title, rating, plot) bằng React-Bootstrap `Card`
- Hiển thị danh sách reviews với tiêu đề `Reviews` và nút `Add Review`

## Bài 4. Hiển thị danh sách review tương ứng cho từng phim dưới phần Plot

### 4.1 JSX hiển thị danh sách review cho phim

- Trang `Movie` hiển thị phần `Reviews` ngay dưới khu vực thông tin/plot của phim
- Mỗi review gồm tên người review và nội dung review

### 4.2 Thêm review cho phim (bằng công cụ Postman/Insomnia)

- Gửi request `POST /api/v1/movies/review` để thêm review cho movie
- Sau đó refresh trang `/movies/:id` để thấy review mới hiển thị

### 4.3 Điều chỉnh hiển thị thời gian với momentjs

- Cài `moment` và format ngày review theo dạng `Do MMMM YYYY` (ví dụ: `18th April 2022`)

## Chạy ứng dụng

Chạy backend (port 5000) trong `Lab05`:

```bash
cd Lab05
npm install
npm start
```

Chạy frontend (port 3000) trong `Lab05/frontend`:

```bash
cd Lab05/frontend
npm install
npm start
```
