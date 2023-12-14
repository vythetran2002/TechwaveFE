import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchCateListByPage = (id0, id1, page, limit, myToken) => {
  let url = null;
  if (id1) {
    url = "http://localhost:3000/api/category/" + id1;
  } else {
    url = "http://localhost:3000/api/category/" + id0;
  }

  // const url = "http://localhost:3000/api/category/" + id;

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `${token}`,
  };

  if (myToken && myToken != "undefined") {
    headers.Authorization = `${token}`;
  }

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

export default useFetchCateListByPage;
