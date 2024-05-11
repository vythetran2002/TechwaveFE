export function calculateDiscountFreeShip(a, b) {
  var result = Number(a) - Number(b);
  if (result < 0) {
    return 0;
  }
  return result;
}
