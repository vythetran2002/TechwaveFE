const axios = require("axios");
import toast from "react-hot-toast";

export const CreateAccount = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/account/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Added Account");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
