import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

const useFetchAdminCategories = (page, limit, myToken) => {
  const url = "http://localhost:3000/api/admin/category/";

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const queryParams = `page=${page}&limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(
    page && limit ? `${url}?${queryParams}` : null,
    () => fetcher(`${url}?${queryParams}`, headers),
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

export default useFetchAdminCategories;
