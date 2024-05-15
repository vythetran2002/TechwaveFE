import axios from "axios";
import Cookies from "js-cookie";

export const getVoucherByVoucherId = async (voucherId, price) => {
  const acToken = Cookies.get("token");
  const url = "http://localhost:3000/api/user/discount/select";
  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const params = {
    idDiscount: voucherId,
    price: price,
  };

  try {
    const response = await axios.get(url, { headers, params });
    return response.data;
  } catch (error) {
    throw error;
  }
};
