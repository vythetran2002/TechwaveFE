const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteVendorComment = async (id, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/review/deleteResponse/" + id;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: {
    //   quantity: quantity,
    //   price: price,
    // },
  };

  try {
    const response = await axios.delete(url, config);
    toast.success("Xoá đánh giá thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
