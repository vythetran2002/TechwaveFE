const axios = require("axios");
import toast from "react-hot-toast";

export const DeleteVoucherAdmin = async (id, token) => {
  // const url = "http://localhost:3000/api/admin/discount/delete/" + id;
  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/admin/discount/delete/" + id;
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
    toast.success("Delete Voucher Successfully!");
    return response.data;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
