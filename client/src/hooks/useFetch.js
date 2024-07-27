import { useState, useEffect, useRef } from "react";
import axios from "axios";

const Default = (defOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const options = useRef(defOptions);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios(options.current);

        setResponse(response);
      } catch (err) {
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { ...response, loading, error };
};

export { Default as useFetch };
