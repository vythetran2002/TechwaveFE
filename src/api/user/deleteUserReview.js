const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteUserReview = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: {},
  };

  try {
    const response = await axios.delete(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/review/delete/" + id,
      config
    );
    toast.success("Xoá đánh giá thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
