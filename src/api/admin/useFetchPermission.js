import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchPermission = (id) => {
  const acToken = Cookies.get("token");
  const url = "http://localhost:3000/api/admin/permission/";

  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const { data, error, mutate, isValidating } = useSWR(
    url,
    () => fetcher(url, headers),
    { refreshInterval: 1000 }
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchPermission;
