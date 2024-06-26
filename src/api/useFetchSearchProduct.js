import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchSearchProduct = (value) => {
  //   const [cookies] = useCookies();
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/search?name=" + value;
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
