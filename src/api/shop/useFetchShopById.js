import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Cookies from "js-cookie";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchShopByPage = (id) => {
  const acToken = Cookies.get("token");
  // console.log(cookies);
  const url = "http://localhost:3000/api/store/" + id;

  const token = "Bearer " + acToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  if (acToken) {
    headers.Authorization = ` ${token}`;
  }

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

export default useFetchShopByPage;
