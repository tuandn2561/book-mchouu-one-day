# 💖 Web Album Sinh Nhật 3D - Món Quà Kỷ Niệm (GitHub Pages)

Trang web album ảnh & video 3D lật trang lãng mạn, dễ thương được thiết kế riêng làm quà tặng sinh nhật, tối ưu hóa để chạy trực tiếp trên **GitHub Pages**.

---

## 🌟 Các Tính Năng Nổi Bật

1. **Phong bì bí mật (Intro Envelope 3D):**
   - Màn hình mở quà với phong bì thư thắt dấu sáp sang trọng.
   - Khi chạm mở: Nhạc nền du dương cất lên, pháo giấy confetti bung tỏa và chuyển cảnh vào cuốn Album 3D.
2. **Cuốn Album 3D Scrapbook Tương Tác:**
   - Hiệu ứng lật trang 3D chân thực (click góc sách, phím mũi tên, vuốt cảm ứng trên điện thoại).
   - Âm thanh lật sách lạo xạo sống động (Web Audio API Sound Effects).
   - Phong cách Scrapbook vintage dễ thương: Ảnh Polaroid, kẹp ghim, băng dính Washi Tape, sticker động (🌸, 🎀, 🧸, ✨).
3. **Trình chiếu Ảnh & Video từ thư mục `/media`:**
   - Tự động hiển thị các kỷ niệm theo ngày tháng kèm lời chúc ngọt ngào.
   - Tự động phát video `.mp4` khi lật đến trang có video và tạm dừng khi lật sang trang khác.
4. **Bánh Sinh Nhật & Thổi Nến Tương Tác:**
   - Bánh kem 3D với 3 ngọn nến lung linh.
   - Nhấn vào ngọn nến để "thổi nến" -> Ngọn lửa tắt kèm tiếng phù nhẹ và pháo hoa rực rỡ nổ khắp màn hình!
5. **Bức Thư Tình Cuối Sách & Bộ Sưu Tập Xem Nhanh:**
   - Bức thư giấy da với những lời chúc chân thành, sâu lắng nhất.
   - Nút **🖼️ Bộ sưu tập** (ở góc phải trên) để mở nhanh danh sách tất cả ảnh và nhảy ngay đến trang mong muốn.
6. **Đĩa Than Phát Nhạc & Hiệu Ứng Bầu Trời:**
   - Nhạc nền lofi/acoustic lãng mạn (có tích hợp sẵn bộ tổng hợp âm thanh hộp nhạc Web Audio API dự phòng khi mất mạng).
   - Cánh hoa đào & trái tim bay bổng, vệt sao lấp lánh theo con trỏ chuột.
   - Đổi theme màu nền (🌸 Pastel Hồng / 🌌 Bầu Trời Sao / 🌅 Hoàng Hôn).

---

## 🚀 Hướng Dẫn Deploy Lên GitHub Pages

Chỉ với 3 bước đơn giản:

1. **Đẩy mã nguồn lên GitHub:**
   ```bash
   git add .
   git commit -m "Happy Birthday Gift Album"
   git push origin main
   ```
2. **Bật GitHub Pages:**
   - Truy cập vào Repository của bạn trên GitHub.
   - Vào mục **Settings** -> chọn tab **Pages** ở thanh menu bên trái.
   - Tại mục **Build and deployment** -> **Branch**: chọn `main` và thư mục `/ (root)` -> nhấn **Save**.
3. **Truy cập web:**
   - Sau 1 - 2 phút, trang web của bạn sẽ hoạt động tại địa chỉ:  
     `https://<tên-tài-khoản-github>.github.io/<tên-repo>/`

---

## ⚙️ Tùy Chỉnh Nội Dung Dễ Dàng (`js/config.js`)

Mở file [`js/config.js`](file:///Volumes/SSD%202/Projects/book-mchouu-one-day/js/config.js) để chỉnh sửa:
- `recipientName`: Tên bạn gái (Mchouu / Em bé / ...)
- `birthdayDate`: Ngày sinh nhật
- `loveLetter`: Nội dung bức thư tình
- `pages`: Thêm, bớt, đổi thứ tự ảnh hoặc thay đổi lời chúc cho từng bức ảnh/video.
