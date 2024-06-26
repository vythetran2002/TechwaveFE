const axios = require("axios");
import toast from "react-hot-toast";

export const RejectOrder = async (id, token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/vendor/bill/reject/" + id;
  // "http://localhost:3000/api/vendor/bill/reject/" + id;

  try {
    const response = await axios.put(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Rejected");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
