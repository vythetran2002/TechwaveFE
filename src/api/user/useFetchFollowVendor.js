import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchUserFollowVendor = () => {
  const acToken = Cookies.get("token");
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/user/folow";
  // "http://localhost:3000/api/user/folow";

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

export default useFetchUserFollowVendor;
