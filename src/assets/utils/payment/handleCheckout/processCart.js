const axios = require("axios");

export async function processCart(cartData) {
  const successQueue = [];
  const failureQueue = [];

  for (const shop of cartData) {
    for (const item of shop.cart) {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_URL +
            `/api/product/${item.product.product_id}`
        );
        const productData = response.data;
        if (productData.quantity >= item.quantity) {
          successQueue.push(item);
        } else {
          failureQueue.push(item);
        }
      } catch (error) {
        console.error(
          `Error processing product ${item.product.product_id}: ${error.message}`
        );
        failureQueue.push(item);
      }
    }
  }

  return { successQueue, failureQueue };
}
