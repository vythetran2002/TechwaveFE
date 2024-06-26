import useSWR from "swr";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchDetailReviewAdmin = (myID) => {
  const acToken = Cookies.get("token");
  // const url = "http://localhost:3000/api/admin/review/" + myID;
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/admin/review/" + myID;
  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const fetcher = (url, headers) =>
    axios.get(myID ? url : null, { headers }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(
    myID ? `http://localhost:3000/api/admin/review/${myID}` : null,
    () => fetcher(url, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchDetailReviewAdmin;
