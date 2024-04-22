import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchCart = () => {
  const [cookies] = useCookies(["token"]); // Only get the 'token' cookie
  const url = "http://localhost:3000/api/user/cart";

  // Check if token exists before creating the Authorization header
  const token =
    cookies["token"] && cookies["token"] != "undefined"
      ? `Bearer ${cookies["token"]}`
      : null;

  const headers = token
    ? {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: token,
      }
    : {};

  const { data, error, mutate, isValidating } = useSWR(
    token ? url : null, // Only fetch if the token exists
    token ? () => fetcher(url, headers) : null // Provide fetcher function only if token exists
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchCart;
