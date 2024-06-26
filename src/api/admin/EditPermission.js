const axios = require("axios");
import toast from "react-hot-toast";

export const EditPermission = async (data, token) => {
  // const url = "http://localhost:3000/api/admin/permission/edit";
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/admin/permission/edit";
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Update Permission Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
