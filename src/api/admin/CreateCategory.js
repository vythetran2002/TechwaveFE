const axios = require("axios");
import toast from "react-hot-toast";

export const CreateCategory = async (data, token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/admin/category/create";
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Add Category Successfully");
    return response.data;
  } catch (error) {
    //
    toast.error(error.response.data.message);
    throw error;
  }
};
