import axios from "axios";
import { useCallback, useState, useRef } from "react";

const Default = (defOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(false);
  const options = useRef(defOptions);

  /*
  useEffect(() => {
    options.current = defOptions;
  }, [defOptions]);
  */

  const fetchData = useCallback(async (additionalOptions) => {
    setLoading(true);
    try {
      const response = await axios({
        ...options.current,
        ...additionalOptions,
      });

      setResponse(response);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, []);

  return { response, loading, error, fetchData };
};

export { Default as useFetch };
