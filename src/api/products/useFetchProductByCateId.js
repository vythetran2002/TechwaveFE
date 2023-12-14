import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchProductByCateId = (id) => {
  const [cookies] = useCookies(["token"]);
  const url = "http://localhost:3000/api/category/" + id;

  const token = "Bearer " + cookies["token"];

  // const headers = {
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  //   Authorization: `${token}`,
  // };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (cookies["token"] && cookies["token"] != "undefined") {
    headers.Authorization = ` ${token}`;
  }

  const { data, error, mutate, isValidating } = useSWR(
    token ? url : null,
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

export default useFetchProductByCateId;
