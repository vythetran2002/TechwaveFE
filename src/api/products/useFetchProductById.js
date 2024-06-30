import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchProductById = (id) => {
  // const url = "http://localhost:3000/api/product/" + id;
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/product/" + id;

  const { data, error, mutate, isValidating } = useSWR(id ? url : null, () =>
    fetcher(id ? url : null)
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
