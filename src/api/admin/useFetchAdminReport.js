import useSWR from "swr";
import axios from "axios";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchAdminReport = (status, page, limit, myToken) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/admin/report/";

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const queryParams = `status=${status}&page=${page}&limit=${limit}`;

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

export default useFetchAdminReport;
