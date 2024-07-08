const axios = require("axios");
import toast from "react-hot-toast";

export const PutProductDesc = async (id, data, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL +
    "/api/vendor/product/detail/" +
    id +
    "/edit";

  try {
    const response = await axios.put(
      url,
      {
        content: data,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Cập nhật thành công");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
