import { useState, useEffect } from "react";
import axios from "axios";

const useFetchSearchProduct = (value) => {
  //   const [cookies] = useCookies();
  const url = process.env.NEXT_PUBLIC_API_URL + "/api/search?name=" + value;
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(url);
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url]);

  return { data, loading, error };
};

export default useFetchSearchProduct;
