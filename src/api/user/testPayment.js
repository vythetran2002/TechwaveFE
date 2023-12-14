import useSWR from "swr";
import axios from "axios";
import { useState } from "react";
import { useCookies } from "react-cookie";

const useFetchTestPayment = (params) => {
  const [cookies] = useCookies();
  const url = "http://localhost:3000/api/user/payment/vnpay_return";

  const token = "Bearer " + cookies["token"];

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  //   const fetcher = (url, headers) =>
  //     axios
  //       .get(
  //         url,
  //         {
  //           params: params,
  //         },
  //         { headers, credentials: "include" }
  //       )
  //       .then((res) => res.data);

  //   const { data, error, mutate, isValidating } = useSWR(url, () =>
  //     fetcher(url, headers)
  //   );

  const fetcher = (url, headers) => {
    if (Object.keys(params).length > 0) {
      return axios
        .get(
          url,
          {
            params: params,
          },
          { headers }
        )
        .then((res) => res.data);
    } else {
      // Trả về dữ liệu mặc định khi params rỗng
      return null;
    }
  };

  const { data, error, mutate, isValidating } = useSWR(
    Object.keys(params).length > 0 ? url : null, // Chỉ gọi useSWR khi params khác rỗng
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

export default useFetchTestPayment;
