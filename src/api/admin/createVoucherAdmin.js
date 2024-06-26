const axios = require("axios");
import toast from "react-hot-toast";

export const CreateVoucherAdmin = async (data, token) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/admin/discount/create";
  try {
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Added Voucher");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
