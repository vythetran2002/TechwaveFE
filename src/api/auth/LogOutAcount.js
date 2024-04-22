const axios = require("axios");
import toast from "react-hot-toast";

export const LogOutAccount = async (token) => {
  try {
    const response = await axios.post("http://localhost:3000/api/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Logout Successfully");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
