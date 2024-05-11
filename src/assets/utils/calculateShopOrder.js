export function calculateTotal(cart) {
  if (cart) {
    let total = 0;
    for (let item of cart) {
      total += item.quantity * item.price;
    }
    return total;
  } else return null;
}
