# P3-Education (Dự án vẫn còn phát triển...)

# Mô tả:

Ứng dụng dành cho giáo viên quản lý bài giảng và học sinh - gồm 1 backend và 1 frontend

# Backend:

1. Nodejs + express + mongoDB
2. Câu trúc theo mô hình MVC
3. Authentication: Dùng Bcrypjs để mã hoá password
4. Viết theo RESTfull API
5. Giao tiếp với frontend thông qua Json-Web-Token
6. Dùng middleware để check phân quyền giữa admin, mod, user và các phân quyền tuỳ chọn

# Frontend

1. Reactjs + Redux
2. Tính năng:

- Đăng nhập - đăng xuất
- Phân quyền: Admin có thể bổ nhiệm các role - tuỳ chỉnh các role dùng các tính năng nhất định (dùng tuyển cộng tác viên hoặc gia sư).
- Tạo bài giảng: Admin và mod có thể tạo các bài giảng của riêng mình, bằng cách ghép nhiều module lại.
- Tạo user: Có thể tạo tài khoản cho học sinh.
- Tạo lớp: Tạo và quản lý lớp học, gồm các bài giảng đã tạo, các học sinh đã tạo, kèm theo quản lý điểm danh, quan lý học phí.
- Xem lịch giảng dạy trong tuần
- Overview: tổng hợp thông tin các lớp đang hoạt động, các user đang học và báo cáo doanh thu.
- Chỉnh sửa phân quyền, bổ nhiệm hoặc giáng chức user.
- Có module thiết kế dạy đề TOEIC, gồm đầy đủ câu hỏi, file nghe, check điểm số sau mỗi bài làm, và audio nghe đúng ngay phần câu hỏi hiện tại.
- ...

- Tính năng update thông tin cá nhân, thay đổi mật khẩu, tuỳ chỉnh thời gian của lịch tuần.

# Demo

1. Admin-portal: https://p3-education-demo.web.app
2. admin-account: admin@gmail.com, password: 12345678
