const axios = require("axios");
import toast from "react-hot-toast";

export const PostReport = async (data, token) => {
  try {
    const response = await axios.post(
      process.env.NEXT_PUBLIC_API_URL + "/api/user/report/create",
      // "http://localhost:3000/api/user/report/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    toast.success("Report Account Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
