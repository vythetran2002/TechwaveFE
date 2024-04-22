import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchUserProfile = () => {
  const acToken = Cookies.get("token");
  const url = "http://localhost:3000/api/user/account/detail";

  const token = acToken && acToken != "undefined" ? `Bearer ${acToken}` : null;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

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

export default useFetchUserProfile;
