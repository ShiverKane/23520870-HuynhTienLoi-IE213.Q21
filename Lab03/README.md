KẾT QUẢ THỰC HIỆN

| Bài | Yêu cầu                      | Kết quả                                                                                                                   |
| --- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 1.1 | Định tuyến `/review`         | Đã tạo route `/api/v1/movies/review` trong `api/movies.router.js`                                                         |
| 1.2 | POST thêm review             | Đã map `POST /api/v1/movies/review` gọi `ReviewsController.apiPostReview()`                                                |
| 1.3 | PUT sửa review               | Đã map `PUT /api/v1/movies/review` gọi `ReviewsController.apiUpdateReview()`                                               |
| 1.4 | DELETE xoá review            | Đã map `DELETE /api/v1/movies/review` gọi `ReviewsController.apiDeleteReview()`                                            |
| 2.1 | Tạo `reviews.controller.js`  | Đã tạo `api/reviews.controller.js` chứa class `ReviewsController`                                                         |
| 2.2 | Import `reviewsDAO.js`       | Đã import `ReviewsDAO` từ `dao/reviewsDAO.js` để gọi các hàm thao tác dữ liệu                                              |
| 2.3 | `apiPostReview()`            | Nhận `movie_id`, `review`, `userinfo{name,id}` từ body, tạo `date`, gọi `ReviewsDAO.addReview()` và trả JSON `{status:"success"}` |
| 2.4 | `apiUpdateReview()`          | Nhận `review_id`, `user_id` (và `review` nếu có) từ body, tạo `date`, gọi `ReviewsDAO.updateReview()`, kiểm tra `modifiedCount` rồi trả `{status:"success"}` |
| 2.5 | `apiDeleteReview()`          | Nhận `review_id`, `user_id` từ body và gọi `ReviewsDAO.deleteReview()`, trả `{status:"success"}`                          |
| 3.1 | Tạo `reviewsDAO.js`          | Đã tạo `dao/reviewsDAO.js`, import `mongodb`, khai báo `ObjectId`, tạo biến `reviews` tham chiếu collection `reviews`     |
| 3.2 | `injectDB()` cho reviews     | Đã tạo `ReviewsDAO.injectDB()` và gọi trong `index.js` sau khi `client.connect()` và trước khi `app.listen()`             |
| 3.3 | `addReview()`                | Dùng `insertOne()`, chuyển `movieId` sang `ObjectId`, lưu `{movie_id,user_id,name,review,date}` vào collection `reviews`  |
| 3.4 | `updateReview()`             | Dùng `updateOne()`, chuyển `reviewId` sang `ObjectId`, điều kiện `_id` và `user_id` trùng khớp, trả về `modifiedCount`    |
| 3.5 | `deleteReview()`             | Dùng `deleteOne()`, chuyển `reviewId` sang `ObjectId`, chỉ xoá khi `_id` và `user_id` trùng khớp                          |
| 3.6 | Thử nghiệm API (Insomnia)    | Đã test `POST/PUT/DELETE /api/v1/movies/review` (đặt `user_id` = `23520870`) và nhận phản hồi JSON `{status:"success"}`   |
| 4.1 | Thêm định tuyến               | Đã thêm `GET /api/v1/movies/id/:id` (lấy movie + reviews) và `GET /api/v1/movies/ratings`                                 |
| 4.2 | Thêm methods controller      | Đã thêm `apiGetMovieById()` và `apiGetRatings()` trong `api/movies.controller.js`                                         |
| 4.3 | Thêm methods DAO             | Đã thêm `getMovieById()` (dùng `$match`, `$lookup`, `aggregate()`) và `getRatings()` (dùng `distinct("rated")`) trong `dao/moviesDAO.js` |
| 4.4 | Thử nghiệm API                | Đã test `GET /api/v1/movies/ratings` và `GET /api/v1/movies/id/:id` trả về dữ liệu đúng                                   |
