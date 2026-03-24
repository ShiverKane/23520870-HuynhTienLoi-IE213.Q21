KẾT QUẢ THỰC HIỆN

| Bài | Yêu cầu                      | Kết quả                                                                                                                   |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 2.1 | Tạo tệp `server.js`          | Đã tạo file `server.js`, cấu hình Express, middleware (`cors`, `express.json`) và routing `/api/v1/movies`, xử lý lỗi 404 |
| 2.2 | Tạo file `.env`              | Đã tạo file `.env` chứa `PORT` và `MOVIEREVIEWS_DB_URI` kết nối MongoDB Atlas                                             |
| 2.3 | Tạo `index.js`               | Đã xây dựng file `index.js` để kết nối MongoDB và khởi chạy server                                                        |
| 2.4 | Tạo route `/api/v1/movies`   | Đã tạo file `movies.route.js`, endpoint `/` trả về `"hello world"` khi truy cập                                           |
| 2.5 | Xây dựng DAO                 | Đã tạo `moviesDAO.js` với phương thức `injectDB()` kết nối collection `movies` và `getMovies()` để truy vấn dữ liệu       |
| 2.6 | Xây dựng Controller          | Đã tạo `movies.controller.js`, xây dựng hàm `apiGetMovies()` để xử lý request và gọi DAO                                  |
| 2.7 | Kết nối Controller với Route | Khi truy cập `/api/v1/movies`, server gọi `apiGetMovies()` và trả về dữ liệu JSON từ database                             |
