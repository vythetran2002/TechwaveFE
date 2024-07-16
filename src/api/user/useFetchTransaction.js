import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers, params) =>
  axios.get(url, { headers, params }).then((res) => res.data);

const useFetchTransaction = (params) => {
  const acToken = Cookies.get("token");

  const url =
    process.env.NEXT_PUBLIC_API_URL + "/api/user/payment/vnpay_return";

  const token = acToken && acToken != "undefined" ? `Bearer ${acToken}` : null;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const { data, error, mutate, isValidating } = useSWR(
    token ? [url, params] : null,
    () => fetcher(url, headers, params)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchTransaction;
