import { useState, useEffect } from "react";
import axios from "axios";

export const useFetchShippingFee = (
  from_district,
  from_ward,
  to_district,
  to_ward
) => {
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

  const headers = { token: "914368f7-8f98-11ee-b1d4-92b443b7a897" };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(url, { params, headers });
        setData(response.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [from_district, from_ward, to_district, to_ward]);

  return { data, isLoading, error };
};

export default useFetchShippingFee;
