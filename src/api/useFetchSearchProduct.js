import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchSearchProduct = (value) => {
  //   const [cookies] = useCookies();
  const url = "http://localhost:3000/api/search?name=" + value;
  //   const token = "Bearer " + cookies["token"];

  //   const headers = {
  //     Accept: "application/json",
  //     "Content-Type": "application/json",
  //     Authorization: `${token}`,
  //   };

  const { data, error, mutate, isValidating } = useSWR(value ? url : null, () =>
    fetcher(url)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchSearchProduct;
