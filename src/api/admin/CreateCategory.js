const axios = require("axios");
import toast from "react-hot-toast";

export const CreateCategory = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/category/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Add Category Successfully");
    return response.data;
  } catch (error) {
    //
    toast.error(error.response.data.message);
    throw error;
  }
};
