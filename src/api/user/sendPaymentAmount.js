const axios = require("axios");
import toast from "react-hot-toast";
import { useRouter } from "next/router";
export const SendPaymentAmount = async (data, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/payment/create_payment_url",
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // toast.success("Success");
    // return response.data;
    console.log(response.data.http);
    window.location.href = `${response.data.http}`;
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
