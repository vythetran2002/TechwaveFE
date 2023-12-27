import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchUserReviews = () => {
  const [cookies] = useCookies();
  const url = "http://localhost:3000/api/user/review?status=1";

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const { data, error, mutate, isValidating } = useSWR(
    url,
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

export default useFetchUserReviews;
