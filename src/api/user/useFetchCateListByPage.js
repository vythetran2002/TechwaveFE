import useSWR from "swr";
import axios from "axios";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchCateListByPage = (id0, id1, page, limit, myToken) => {
  let url = null;
  if (id1) {
    url = process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id1;
  } else {
    url = process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id0;
  }

  const token = "Bearer " + myToken;

  const queryParams = `page=${page}&limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(
    id0 || id1 || (page && limit) ? `${url}?${queryParams}` : null,
    () => fetcher(`${url}?${queryParams}`)
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
