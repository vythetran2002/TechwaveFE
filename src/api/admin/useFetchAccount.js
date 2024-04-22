import useSWR from "swr";
import axios from "axios";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const useFetchAccount = (status, page, limit, myToken) => {
  const url = "http://localhost:3000/api/admin/account/";

  const token = "Bearer " + myToken;

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `${token}`,
  };

  const queryParams = `status=${status}&page=${page}&limit=${limit}`;

  const { data, error, mutate, isValidating } = useSWR(
    [page && limit ? `${url}?${queryParams}` : null],
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

// const useFetchAccount = async (params) => {
//   const [cookies] = useCookies();

//   const token = "Bearer " + cookies["token"];

//   const headers = {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     Authorization: `${token}`,
//   };

//   try {
//     const response = await axios.get(
//       "http://localhost:3000/api/admin/account/",
//       {
//         params: params,
//         headers: headers,
//       }
//     );

//     const data = response.data;
//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

export default useFetchAccount;
