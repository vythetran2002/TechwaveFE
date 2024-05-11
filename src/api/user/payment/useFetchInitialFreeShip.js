import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchInitialFreeShip = (price) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const acToken = Cookies.get("token");
        const url = "http://localhost:3000/api/user/discount/freeShip";
        const token = "Bearer " + acToken;

        const headers = {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `${token}`,
        };

        const params = {
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
  }, [price]);

  return { data, isLoading, error };
};

export default useFetchInitialFreeShip;
