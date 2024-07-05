import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchCateListByPage = (id0, id1, page, limit, filter) => {
  const acToken = Cookies.get("token");
  let url = null;
  let queryParams = null;
  if (id1) {
    url = process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id1;
  } else {
    url = process.env.NEXT_PUBLIC_API_URL + "/api/category/" + id0;
  }

  if (filter) {
    queryParams = `index=${filter}&page=${page}&limit=${limit}`;
  } else {
    queryParams = `page=${page}&limit=${limit}`;
  }

  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  if (acToken && acToken != "undefined") {
    headers.Authorization = ` ${token}`;
  }

  const { data, error, mutate, isValidating } = useSWR(
    id0 || id1 || (page && limit) ? `${url}?${queryParams}` : null,
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
