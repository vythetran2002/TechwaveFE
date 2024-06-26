const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteSoftAccount = async (id, token) => {
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/account/delete-soft/" + id;
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
    toast.success("Soft Delete Successful");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
