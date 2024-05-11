const axios = require("axios");
import toast from "react-hot-toast";

export const CreateVoucherAdmin = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/admin/discount/create",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("Added Voucher");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
