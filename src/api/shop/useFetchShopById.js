import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchShopByPage = (id) => {
  const acToken = Cookies.get("token");
  // console.log(cookies);
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/store/" + id;

  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (acToken) {
    headers.Authorization = ` ${token}`;
  }

  const { data, error, mutate, isValidating } = useSWR(id ? url : null, () =>
    fetcher(url, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchShopByPage;
