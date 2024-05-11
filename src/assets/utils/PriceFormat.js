export function FormatPrice(price) {
  if (price === 0) {
    return "0đ";
  } else if (price) {
    if (typeof price === "number") {
      return price.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
      });
    } else if (typeof price === "string") {
      const numericPrice = parseFloat(price);
      if (!isNaN(numericPrice)) {
        return numericPrice.toLocaleString("vi-VN", {
          style: "currency",
          currency: "VND",
        });
      }
    }
    return price;
  }
}
