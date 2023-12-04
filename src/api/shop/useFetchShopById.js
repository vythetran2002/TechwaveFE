import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const useFetchShopById = (id) => {
  const [cookies] = useCookies();
  console.log(cookies);
  const url = "http://localhost:3000/api/store/" + id;

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (cookies["token"]) {
    headers.Authorization = ` ${token}`;
  }

  const fetcher = (url, headers) =>
    axios.get(url, { headers }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(
    id ? `http://localhost:3000/api/store/${id}` : null,
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

export default useFetchShopById;
