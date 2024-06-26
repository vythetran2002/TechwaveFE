const axios = require("axios");
import toast from "react-hot-toast";

export const UpdateCategory = async (id, data, token) => {
  // const url = "http://localhost:3000/api/admin/category/edit/" + id;
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/category/edit/" + id;

  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Update Category Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
