import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const useFetchProductById = (id) => {
  const url = "http://localhost:3000/api/product/" + id;
  const fetcher = (url) => axios.get(url).then((res) => res.data);
  const { data, error, mutate, isValidating } = useSWR(
    id ? `http://localhost:3000/api/product/${id}` : null,
    fetcher
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
