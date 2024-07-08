import useSWR from "swr";
import axios from "axios";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchComment = (status, page, limit, myToken) => {
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/vendor/review";

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const queryParams = `status=${status}&page=${page}&limit=${limit}`;

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

export default useFetchComment;
