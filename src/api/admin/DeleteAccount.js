const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteAccount = async (id, token) => {
  const url = "http://localhost:3000/api/admin/account/remove/" + id;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    // data: {
    //   quantity: quantity,
    //   price: price,
    // },
  };

  try {
    const response = await axios.delete(url, config);
    toast.success("Account Deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
