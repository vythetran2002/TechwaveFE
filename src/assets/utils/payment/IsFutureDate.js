export function isFutureDate(date) {
  const today = new Date();
  const inputDate = new Date(date);

  // So sánh inputDate với today, bỏ qua phần thời gian (giờ, phút, giây)
  return inputDate.setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
}
