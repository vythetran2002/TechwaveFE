const axios = require("axios");
import toast from "react-hot-toast";

export const addFavouriteProduct = async (id, token) => {
  const data = {
    recipient: "linhltv9a2@gmail.com",
    msgBody: "Hey! \n\n this is.... \n\n Thanks",
    subject: "Simple Email Message",
  };

  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/favor/" + id,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Đã thêm vào danh sách yêu thích");
    // Xử lý kết quả response ở đây (nếu cần)
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
