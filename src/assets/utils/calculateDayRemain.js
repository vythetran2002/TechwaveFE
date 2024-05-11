export function calculateRemainingDays(currentDay, goalDay) {
  var current = new Date(currentDay);
  var goal = new Date(goalDay);
  var diff = goal - current;
  var diffInHours = Math.floor(diff / 1000 / 60 / 60);
  var diffInDays = Math.floor(diffInHours / 24);

  if (diff < 0) {
    return "Voucher đã hết hạn";
  } else if (diffInHours < 24) {
    return "còn " + diffInHours + " giờ";
  } else {
    return "còn " + diffInDays + " ngày";
  }
}
