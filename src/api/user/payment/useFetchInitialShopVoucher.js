import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchInitialShopVoucher = (shop_id, price) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const acToken = Cookies.get("token");
        const url = "http://localhost:3000/api/user/discount/voucher";
        const token = "Bearer " + acToken;

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const params = {
          idshop: shop_id,
          price: price,
        };
        const response = await axios.get(url, { params, headers });
        setData(response.data);
      } catch (error) {
        setError(error);
      }

      setIsLoading(false);
    };

    fetchData();
  }, [shop_id, price]);

  return { data, isLoading, error };
};

export default useFetchInitialShopVoucher;
