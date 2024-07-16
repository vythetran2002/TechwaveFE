export function CalculateTotalValueForSecondCheckout(shop) {
  return shop.reduce((totalAllShops, store) => {
    const cartTotal = store.cart.reduce((total, item) => {
      const price = item.product.promotional_price || item.product.price;
      return total + price * item.quantity;
    }, 0);

    return (
      totalAllShops + cartTotal + store.shipFee - store.totalVoucherDiscount
    );
  }, 0);
}

export function recalculateTotalBill(shop) {
  return shop.map((shopItem) => {
    const cartTotal = shopItem.cart.reduce((total, item) => {
      const itemPrice = item.product.promotional_price || item.product.price;
      return total + itemPrice * item.quantity;
    }, 0);

    const newTotalBill =
      cartTotal + shopItem.shipFee - shopItem.totalVoucherDiscount;

    return {
      ...shopItem,
      totalBill: newTotalBill,
    };
  });
}
