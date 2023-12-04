const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteSoftAccount = async (id, token) => {
  try {
    const response = await axios.put(
      "http://localhost:3000/api/admin/account/delete-soft/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Soft Delete Successful");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
