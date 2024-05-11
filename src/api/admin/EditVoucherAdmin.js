const axios = require("axios");
import toast from "react-hot-toast";

export const EditVoucherAdmin = async (id, data, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/admin/discount/edit/" + id,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Updated");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
