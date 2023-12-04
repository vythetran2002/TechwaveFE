const axios = require("axios");
import toast from "react-hot-toast";

export const ResponseComment = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/vendor/response",
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
