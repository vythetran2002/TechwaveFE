export function removeProductFromCart(currentArray, failedArray) {
  const failedCartIds = new Set(failedArray.map((item) => item.cart_id));
  return currentArray.filter((item) => !failedCartIds.has(item.cart_id));
}
