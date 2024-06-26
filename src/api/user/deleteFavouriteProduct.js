const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteFavouriteItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {
      recipient: "linhltv9a2@gmail.com",
      msgBody: "Hey! \n\n this is.... \n\n Thanks",
      subject: "Simple Email Message",
    },
  };

  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/favor/" + id,
      config
    );
    toast.success("Huỷ sản phẩm yêu thích thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
