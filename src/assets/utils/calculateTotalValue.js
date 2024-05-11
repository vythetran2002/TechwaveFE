export const calculateTotalValue = (arr) => {
  if (arr) {
    return arr.reduce((total, obj) => {
      if (obj.product.promotional_price) {
        return total + obj.product.promotional_price * obj.quantity;
      } else {
        return total + obj.product.price * obj.quantity;
      }
    }, 0);
  }
};
