export function getAllDaysOfCurrentMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  // Tạo một mảng rỗng để lưu trữ các ngày
  const days = [];

  // Tạo một đối tượng Date mới với ngày đầu tiên của tháng hiện tại
  const firstDay = new Date(year, month, 1);

  // Lấy số ngày của tháng hiện tại
  const lastDay = new Date(year, month + 1, 0).getDate();

  // Vòng lặp để tạo các ngày trong tháng
  for (let i = 1; i <= lastDay; i++) {
    const day = new Date(year, month, i);
    const formattedDate = `${day.getDate()}/${
      day.getMonth() + 1
    }/${day.getFullYear()}`;
    days.push(formattedDate);
  }

  return days;
}
