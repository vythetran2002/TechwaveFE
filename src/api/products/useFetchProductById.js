import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const useFetchProductById = (id, myToken) => {
  // const url = "http://localhost:3000/api/product/" + id;
  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    // Authorization: `${token}`,
  };

  if (myToken) {
    headers.Authorization = `${token}`;
  }

  const fetcher = (url, headers) =>
    axios.get(url, { headers, credentials: "include" }).then((res) => res.data);

  const { data, error, mutate, isValidating } = useSWR(
    id ? `http://localhost:3000/api/product/${id}` : null,
    () =>
      fetcher(id ? `http://localhost:3000/api/product/${id}` : null, headers)
  );

  return {
    data,
    isLoading: !error && !data,
    isError: error,
    mutate,
    isValidating,
  };
};

export default useFetchProductById;
