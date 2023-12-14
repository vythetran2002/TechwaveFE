import useSWR from "swr";
import axios from "axios";
import { useCookies } from "react-cookie";

const useFetchDetailReviewAdmin = (myID) => {
  const [cookies] = useCookies();
  const url = "http://localhost:3000/api/admin/review/" + myID;
  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const fetcher = (url, headers) =>
    axios.get(myID ? url : null, { headers }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(
    myID ? `http://localhost:3000/api/admin/review/${myID}` : null,
    () => fetcher(url, headers),
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

export default useFetchDetailReviewAdmin;
