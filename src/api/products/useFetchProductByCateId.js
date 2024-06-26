import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) => axios.get(url).then((res) => res.data);

const useFetchProductByCateId = (id) => {
  const acToken = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id;

  const token = "Bearer " + acToken;

  // const headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   Authorization: `${token}`,
  // };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (acToken && acToken != "undefined") {
    headers.Authorization = ` ${token}`;
  }

  const { data, error, mutate, isValidating } = useSWR(token ? url : null, () =>
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

export default useFetchProductByCateId;
