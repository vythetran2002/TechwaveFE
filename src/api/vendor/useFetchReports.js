import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

const useFetchReport = (page, limit) => {
  const [cookies] = useCookies();
  const url = "http://localhost:3000/api/vendor/report";

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const queryParams = `page=${page}&limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(
    page && limit ? `${url}?${queryParams}` : null,
    () => fetcher(`${url}?${queryParams}`, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchReport;
