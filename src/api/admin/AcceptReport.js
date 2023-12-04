const axios = require("axios");
import toast from "react-hot-toast";

export const AcceptReport = async (id, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/admin/report/resolve/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Approve Report Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
    throw error;
  }
};
