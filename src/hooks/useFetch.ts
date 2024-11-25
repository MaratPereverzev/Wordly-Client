import axios, { AxiosResponse } from "axios";
import { useCallback, useState, useRef } from "react";

export const useFetch = (defOptions = {}) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<AxiosResponse<any, any> | null>(
    null
  );
  const [error, setError] = useState(false);
  const options = useRef(defOptions);

  const fetchData = useCallback(
    async (additionalOptions: { [index: string]: number | string }) => {
      setLoading(true);
      try {
        const response: AxiosResponse<any, any> = await axios({
          ...options.current,
          ...additionalOptions,
        });

        setResponse(response);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { response, loading, error, fetchData };
};
