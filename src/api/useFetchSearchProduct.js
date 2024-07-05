import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchSearchProduct = (value) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/api/search?name=${value}`;
  const acToken = Cookies.get("token");

  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  if (acToken && acToken != "undefined") {
    headers.Authorization = ` ${token}`;
  }

  const { data, error, mutate, isValidating } = useSWR(token ? url : null, () =>
    fetcher(url, headers)
  );

  return {
    data,
    loading: !error && !data,
    error,
    mutate,
  };
};

export default useFetchSearchProduct;
