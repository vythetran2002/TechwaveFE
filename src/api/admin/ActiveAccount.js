const axios = require("axios");
import toast from "react-hot-toast";

export const ActiveAccount = async (id, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/account/active/" + id;
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
    toast.success("Active Account Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
