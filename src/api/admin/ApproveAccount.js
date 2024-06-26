const axios = require("axios");
import toast from "react-hot-toast";

export const ApproveAccount = async (id, token) => {
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
    toast.success("Approve Account Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
