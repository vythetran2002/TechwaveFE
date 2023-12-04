const axios = require("axios");
import toast from "react-hot-toast";

export const EditProfile = async (data, token) => {
  const url = "http://localhost:3000/api/admin/account/edit";

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Update Profile Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
