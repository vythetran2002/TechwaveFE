const axios = require("axios");
import toast from "react-hot-toast";

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

export function handleProcessCart(cartData) {
  return toast.promise(
    processCart(cartData),
    {
      loading: "Đang xử lý giỏ hàng...",
      success: (result) => {
        const { successQueue, failureQueue } = result;
        return `Xử lý thành công ${successQueue.length} sản phẩm, ${failureQueue.length} sản phẩm thất bại`;
      },
      error: "Có lỗi xảy ra khi xử lý giỏ hàng",
    },
    {
      style: {
        minWidth: "250px",
      },
      success: {
        duration: 5000,
      },
    }
  );
}
