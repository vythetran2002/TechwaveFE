import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const useFetchReportDetailUser = (id) => {
  const [cookies] = useCookies();
  const url = "http://localhost:3000/api/user/report/" + id;

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const fetcher = (url, headers) =>
    axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(
    id ? { url } : null,
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

export default useFetchReportDetailUser;
