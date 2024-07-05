const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteFavouriteItem = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + "/api/product/deletefavor/" + id,
      config
    );
    toast.success("Huỷ sản phẩm yêu thích thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
