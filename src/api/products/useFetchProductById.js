import useSWR from "swr";
import axios from "axios";

const useFetchProductById = (id, myToken) => {
  // const url = "http://localhost:3000/api/product/" + id;
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + id;

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `${token}`,
  };

  if (myToken && myToken != "undefined") {
    headers.Authorization = `${token}`;
  }

  const fetcher = (url, headers) =>
    axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(id ? url : null, () =>
    fetcher(id ? url : null, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchProductById;
