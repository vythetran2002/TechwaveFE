const axios = require("axios");
import toast from "react-hot-toast";

export const AddProduct = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/vendor/product/create/",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Added");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
