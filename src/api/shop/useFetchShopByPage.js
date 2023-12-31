import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchShopById = (id, page, limit) => {
  const [cookies] = useCookies();
  // console.log(cookies);
  const url = "http://localhost:3000/api/store/" + id;

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (cookies["token"]) {
    headers.Authorization = ` ${token}`;
  }

  const queryParams = `page=${page}&limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(
    id && page && limit ? `${url}?${queryParams}` : null,
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

export default useFetchShopById;
