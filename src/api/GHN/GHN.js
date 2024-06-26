import axios from "axios";
import useSWR from "swr";

const API_TOKEN = "84cae003-14de-11ef-8653-aaa2dde45bcb";
const GET_PROVINCES_URL =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/province";
const GET_DISTRICT_BY_PROVINCE_URL =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=";
const GET_WARD_BY_DISTRICT_URL =
  "https://online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=";
const GET_SHIPPING_FEE_URL =
  "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const feeFetching2 = async (url, params, headers) => {
  try {
    console.log(params);
    const response = await axios.get(url, { params, headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

export class GHN_API {
  getProvinces = () => {
    const headers = {
      token: API_TOKEN,
    };
    const { data, error, mutate, isValidating } = useSWR(
      GET_PROVINCES_URL,
      () => fetcher(GET_PROVINCES_URL, headers)
    );

    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
    // return axios.get(
    //   "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    //   {
    //     headers: { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" },
    //   }
    // );
  };
  getDistricts = (provinceId) => {
    const headers = {
      token: API_TOKEN,
    };

    const url = GET_DISTRICT_BY_PROVINCE_URL + provinceId;

    const { data, error, mutate, isValidating } = useSWR(
      provinceId ? url : null,
      () => fetcher(provinceId ? url : null, headers)
    );

    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
  };
  getWards = (districtId) => {
    const headers = {
      token: API_TOKEN,
    };

    const url = GET_WARD_BY_DISTRICT_URL + districtId;

    const { data, error, mutate, isValidating } = useSWR(
      districtId ? url : null,
      () => fetcher(districtId ? url : null, headers)
    );

    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
  };
  countShippingFee = (from_district, from_ward, to_district, to_ward) => {
    const url = GET_SHIPPING_FEE_URL;
    const params = {
      from_district_id: Number(from_district),
      from_ward_code: String(from_ward),
      service_id: 53320,
      to_district_id: Number(to_district),
      to_ward_code: String(to_ward),
      height: 10,
      length: 10,
      weight: 200,
      width: 10,
      insurance_value: 10000,
      cod_failed_amount: 2000,
      coupon: null,
    };

    // console.log(params);

    const headers = { token: API_TOKEN };
    var { data, error, mutate, isValidating } = useSWR(
      from_district && from_ward && to_district && to_ward ? url : null,
      () => feeFetching2(url, params, headers)
    );

    return {
      data,
      isLoading: !error && !data,
      isError: error,
      mutate,
      isValidating,
    };
  };
}
