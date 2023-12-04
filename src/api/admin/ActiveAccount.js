const axios = require("axios");
import toast from "react-hot-toast";

export const ActiveAccount = async (id, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/admin/account/active/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Active Account Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
