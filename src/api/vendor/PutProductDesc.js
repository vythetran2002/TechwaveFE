const axios = require("axios");
import toast from "react-hot-toast";

export const PutProductDesc = async (id, data, token) => {
  const url = "http://localhost:3000/api/vendor/product/detail/" + id + "/edit";
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
    toast.success("Updated");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
