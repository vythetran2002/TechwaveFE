import axios from "axios";
import useSWR from "swr";
const fetcher = (url, headers) =>
  axios.get(url, { headers }).then((res) => res.data);

const feeFetching = (from_district, from_ward, to_district, to_ward) => {
  axios.get(
    "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
    {
      params: {
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
      },
      headers: { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" },
    }
  );
};

const feeFetching2 = async (url, params, headers) => {
  try {
    console.log(params);
    const response = await axios.get(url, { params, headers });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data);
  }
};

const token = "914368f7-8f98-11ee-b1d4-92b443b7a897";

export class GHN_API {
  getProvinces = () => {
    const headers = {
      token: `${token}`,
    };
    const { data, error, mutate, isValidating } = useSWR(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
      () =>
        fetcher(
          "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
          headers
        )
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
      token: `${token}`,
    };

    const url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district?province_id=" +
      provinceId;

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
    // return axios.get(
    //   "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/province",
    //   {
    //     headers: { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" },
    //   }
    // );
    // return axios.get(
    //   "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/district",
    //   {
    //     params: { province_id: provinceId },
    //     headers: { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" },
    //   }
    // );
  };
  getWards = (districtId) => {
    const headers = {
      token: `${token}`,
    };

    const url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward?district_id=" +
      districtId;

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

    // return axios.get(
    //   "https://dev-online-gateway.ghn.vn/shiip/public-api/master-data/ward",
    //   {
    //     params: { district_id: districtId },
    //     headers: { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" },
    //   }
    // );
  };
  countShippingFee = (from_district, from_ward, to_district, to_ward) => {
    const url =
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
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

    const headers = { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" };
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
