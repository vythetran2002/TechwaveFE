const axios = require("axios");
import toast from "react-hot-toast";

export const AcceptOrder = async (id, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/vendor/bill/approve/" + id;

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
    toast.success("Accepted");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
