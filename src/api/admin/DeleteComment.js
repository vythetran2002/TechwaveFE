const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteComment = async (id, token) => {
  // const url = "http://localhost:3000/api/admin/review/delete/" + id;
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/review/delete/" + id;
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
    toast.success("Comment Deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
