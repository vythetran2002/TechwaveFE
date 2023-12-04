import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const useFetchUserCart = (id) => {
  const url = "http://localhost:3000/api/user/cart";
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer" + token,
  };
  const fetcher = (url, headers) =>
    axios.get(url, { headers }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(url, () =>
    fetcher(url, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchUserCart;
