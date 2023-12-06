import useSWR from "swr";
import axios from "axios";
import { useState } from "react";

const fetcher = (url) => axios.get(url).then((res) => res.data);

const useFetchCateGoryDetail = (id, page, limit, myToken) => {
  const url = "http://localhost:3000/api/category/" + id;

  const queryParams = `page=${page}&limit=${limit}`;

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

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

export default useFetchCateGoryDetail;
