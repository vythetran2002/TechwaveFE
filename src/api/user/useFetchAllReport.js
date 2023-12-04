import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const useFetchAllReport = () => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const url = "http://localhost:3000/api/user/report";
  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const fetcher = (url, headers) =>
    axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(url, () =>
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

export default useFetchAllReport;
