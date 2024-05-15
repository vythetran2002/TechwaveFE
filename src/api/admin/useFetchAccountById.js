import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchAccountById = (id) => {
  // const [cookies] = useCookies();
  const acToken = Cookies.get("token");
  const url = "http://localhost:3000/api/admin/account/detail/" + id;

  // const token = "Bearer " + cookies["token"];
  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const { data, error, mutate, isValidating } = useSWR(
    id ? `http://localhost:3000/api/admin/account/detail/${id}` : null,
    () => fetcher(url, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchAccountById;
