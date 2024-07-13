export function filterZeroQuantityCarts(carts) {
  // Khởi tạo mảng rỗng
  let zeroQuantityCarts = [];

  // Duyệt qua từng phần tử trong mảng carts
  carts.forEach((cart) => {
    // Kiểm tra nếu quantity bằng 0
    if (cart.quantity === 0) {
      // Đẩy vào mảng zeroQuantityCarts
      zeroQuantityCarts.push(cart);
    }
  });

  // Return mảng zeroQuantityCarts sau khi xét xong
  return zeroQuantityCarts;
}

export function updateContinueShop(carts, shop) {
  // Tạo một bản đồ (map) của carts để tra cứu nhanh chóng
  const cartMap = new Map(carts.map((cart) => [cart.cart_id, cart]));

  // Lọc ra các shopItem có cart là mảng rỗng
  const updatedShop = shop.filter((shopItem) => shopItem.cart.length > 0);

  // Cập nhật từng shopItem trong shop
  return updatedShop.map((shopItem) => {
    // Cập nhật từng cart trong shopItem.cart
    const updatedCarts = shopItem.cart
      .map((cart) => {
        // Kiểm tra xem cart có trong cartMap hay không
        const updatedCart = cartMap.get(cart.cart_id);
        if (updatedCart) {
          // Nếu có, thay thế cart trong shopItem bằng cart mới từ cartMap
          return {
            ...updatedCart,
            product: {
              ...updatedCart.product,
              quantity: updatedCart.product.quantity,
            },
            quantity: updatedCart.quantity,
          };
        }
        return cart;
      })
      .filter((cart) => cart.quantity > 0); // Lọc ra các cart có quantity > 0

    return {
      ...shopItem,
      cart: updatedCarts,
    };
  });
}

export function updateCartQuantities(carts) {
  return carts.map((cart) => ({
    ...cart,
    quantity: cart.product.quantity,
  }));
}
