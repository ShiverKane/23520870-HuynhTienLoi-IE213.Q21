// =====================================================
// BÀI 2.1: Tạo cơ sở dữ liệu
// =====================================================
// Chuyển sang database có tên MSSV-IE213 (23520870-ie213)
// Database sẽ được tạo tự động khi thêm document đầu tiên
use 23520870-ie213
// Kết quả: switched to db 23520870-ie213


// =====================================================
// BÀI 2.2: Thêm documents vào collection employees
// =====================================================
// Sử dụng insertMany() để thêm 4 documents đầu tiên
db.employees.insertMany([
  {"id":1,"name":{"first":"John","last":"Doe"},"age":48},
  {"id":2,"name":{"first":"Jane","last":"Doe"},"age":16},
  {"id":3,"name":{"first":"Alice","last":"A"},"age":32},
  {"id":4,"name":{"first":"Bob","last":"B"},"age":64}
])
/* Kết quả:
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('69af9582b54cde94b9b3cc3f'),
    '1': ObjectId('69af9582b54cde94b9b3cc40'),
    '2': ObjectId('69af9582b54cde94b9b3cc41'),
    '3': ObjectId('69af9582b54cde94b9b3cc42')
  }
}
*/


// =====================================================
// BÀI 2.3: Tạo unique index cho trường id
// =====================================================
// Tạo index với ràng buộc unique để đảm bảo id không trùng lặp
db.employees.createIndex({ "id": 1 }, { unique: true })
// Kết quả: id_1

// Kiểm tra tính unique (thử insert document trùng id)
// db.employees.insertOne({"id":1,"name":{"first":"Test","last":"User"},"age":20})
// Lỗi: MongoServerError: E11000 duplicate key error collection


// =====================================================
// BÀI 2.4: Tìm document có firstname là John và lastname là Doe
// =====================================================
// Sử dụng find() với điều kiện lồng nhau (name.first và name.last)
db.employees.find({
  "name.first": "John",
  "name.last": "Doe"
})
/* Kết quả:
{
  _id: ObjectId('69af9582b54cde94b9b3cc3f'),
  id: 1,
  name: { first: 'John', last: 'Doe' },
  age: 48
}
*/


// =====================================================
// BÀI 2.5: Tìm những người có tuổi trên 30 và dưới 60
// =====================================================
// Sử dụng $and để kết hợp nhiều điều kiện
// Có thể dùng cú pháp ngắn hơn: { age: { $gt: 30, $lt: 60 } }
db.employees.find({
  $and: [
    { age: { $gt: 30 } },
    { age: { $lt: 60 } }
  ]
})
/* Kết quả:
{
  _id: ObjectId('69af9582b54cde94b9b3cc3f'),
  id: 1,
  name: { first: 'John', last: 'Doe' },
  age: 48
}
{
  _id: ObjectId('69af9582b54cde94b9b3cc41'),
  id: 3,
  name: { first: 'Alice', last: 'A' },
  age: 32
}
*/


// =====================================================
// BÀI 2.6: Thêm documents và tìm người có middle name
// =====================================================
// Thêm 2 documents mới có chứa trường middle
db.employees.insertMany([
  {"id":5,"name":{"first":"Rooney", "middle":"K", "last":"A"},"age":30},
  {"id":6,"name":{"first":"Ronaldo", "middle":"T", "last":"B"},"age":60}
])
/* Kết quả:
{
  acknowledged: true,
  insertedIds: {
    '0': ObjectId('69af95afb54cde94b9b3cc43'),
    '1': ObjectId('69af95afb54cde94b9b3cc44')
  }
}
*/

// Tìm tất cả documents có tồn tại trường middle name
// Sử dụng $exists: true để kiểm tra field có tồn tại không
db.employees.find({
  "name.middle": { $exists: true }
})
/* Kết quả:
{
  _id: ObjectId('69af95afb54cde94b9b3cc43'),
  id: 5,
  name: { first: 'Rooney', middle: 'K', last: 'A' },
  age: 30
}
{
  _id: ObjectId('69af95afb54cde94b9b3cc44'),
  id: 6,
  name: { first: 'Ronaldo', middle: 'T', last: 'B' },
  age: 60
}
*/


// =====================================================
// BÀI 2.7: Xóa middle name khỏi các document
// =====================================================
// Sử dụng $unset để xóa hoàn toàn trường middle name
// Lưu ý: null là giá trị đặc biệt cho $unset, không phải set thành null
db.employees.updateMany(
  { "name.middle": { $exists: true } },
  { $unset: { "name.middle": null } }
)
/* Kết quả:
{
  acknowledged: true,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
*/

// Kiểm tra lại: không còn document nào có middle name
// db.employees.find({ "name.middle": { $exists: true } }) // Empty array


// =====================================================
// BÀI 2.8: Thêm trường organization: "UIT" vào tất cả documents
// =====================================================
// Sử dụng $set để thêm field mới cho tất cả documents
// Condition {} để chọn tất cả documents
db.employees.updateMany(
  {},
  { $set: { organization: "UIT" } }
)
/* Kết quả:
{
  acknowledged: true,
  matchedCount: 6,
  modifiedCount: 6,
  upsertedCount: 0
}
*/


// =====================================================
// BÀI 2.9: Điều chỉnh organization của nhân viên id 5 và 6 thành "USSH"
// =====================================================
// Sử dụng $in để chọn nhiều giá trị id
db.employees.updateMany(
  { id: { $in: [5, 6] } },
  { $set: { organization: "USSH" } }
)
/* Kết quả:
{
  acknowledged: true,
  matchedCount: 2,
  modifiedCount: 2,
  upsertedCount: 0
}
*/

// Kiểm tra kết quả
db.employees.find({ id: { $in: [5, 6] } }).pretty()
/* Kết quả:
{
  _id: ObjectId('69af95afb54cde94b9b3cc43'),
  id: 5,
  name: { first: 'Rooney', last: 'A' },
  age: 30,
  organization: 'USSH'
}
{
  _id: ObjectId('69af95afb54cde94b9b3cc44'),
  id: 6,
  name: { first: 'Ronaldo', last: 'B' },
  age: 60,
  organization: 'USSH'
}
*/


// =====================================================
// BÀI 2.10: Tính tổng tuổi và tuổi trung bình theo organization
// =====================================================
// Sử dụng aggregation pipeline với $group
// - $sum: tính tổng
// - $avg: tính trung bình
// - _id: "$organization" để nhóm theo trường organization
db.employees.aggregate([
  {
    $group: {
      _id: "$organization",           // Nhóm theo tổ chức
      tongTuoi: { $sum: "$age" },      // Tổng tuổi
      tuoiTrungBinh: { $avg: "$age" }, // Tuổi trung bình
      soLuong: { $sum: 1 }              // Đếm số lượng
    }
  }
])
/* Kết quả:
{
  _id: 'UIT',
  tongTuoi: 160,
  tuoiTrungBinh: 40,
  soLuong: 4
}
{
  _id: 'USSH',
  tongTuoi: 90,
  tuoiTrungBinh: 45,
  soLuong: 2
}

GIẢI THÍCH KẾT QUẢ:
- UIT: 4 nhân viên (id 1,2,3,4) 
  * Tổng tuổi: 48 + 16 + 32 + 64 = 160
  * Trung bình: 160 / 4 = 40
  
- USSH: 2 nhân viên (id 5,6)
  * Tổng tuổi: 30 + 60 = 90
  * Trung bình: 90 / 2 = 45
*/


// =====================================================
// KẾT THÚC LAB 01
// =====================================================
// Tất cả các bài tập đã được thực hiện thành công
// Có thể kiểm tra tổng quan dữ liệu bằng lệnh:
// db.employees.find().pretty()