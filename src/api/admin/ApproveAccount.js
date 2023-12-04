const axios = require("axios");
import toast from "react-hot-toast";

export const ApproveAccount = async (id, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/admin/account/approve/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Approve Account Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
