// Import MongoClient từ thư viện mongodb
const { MongoClient } = require('mongodb');

// URL kết nối tới MongoDB (local hoặc cloud)
const url = 'mongodb://localhost:27017';

// Tên cơ sở dữ liệu
const dbName = 'myDatabase';

// Tạo một client để kết nối với MongoDB
const client = new MongoClient(url);

async function main() {
  try {
    // Kết nối đến MongoDB
    await client.connect();
    console.log('Kết nối thành công đến MongoDB');

    // Chọn cơ sở dữ liệu
    const db = client.db(dbName);

    // Chọn collection (bảng)
    const collection = db.collection('myCollection');

    // Thực hiện chèn một tài liệu vào collection
    const insertResult = await collection.insertOne({ name: 'John Doe', age: 29 });
    console.log('Tài liệu đã được chèn:', insertResult.insertedId);

    // Truy vấn tài liệu từ collection
    const findResult = await collection.findOne({ name: 'John Doe' });
    console.log('Kết quả truy vấn:', findResult);

    // Cập nhật tài liệu
    const updateResult = await collection.updateOne({ name: 'John Doe' }, { $set: { age: 30 } });
    console.log('Số tài liệu đã cập nhật:', updateResult.modifiedCount);

    // Xóa tài liệu
    const deleteResult = await collection.deleteOne({ name: 'John Doe' });
    console.log('Số tài liệu đã xóa:', deleteResult.deletedCount);

  } catch (err) {
    console.error('Lỗi:', err);
  } finally {
    // Đóng kết nối
    await client.close();
  }
}

main().catch(console.error);
