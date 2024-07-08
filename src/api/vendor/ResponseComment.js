const axios = require("axios");
import toast from "react-hot-toast";

export const ResponseComment = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/vendor/response",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Replied Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
