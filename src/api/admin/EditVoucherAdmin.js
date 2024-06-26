const axios = require("axios");
import toast from "react-hot-toast";

export const EditVoucherAdmin = async (id, data, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/discount/edit/" + id;

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Updated");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
