import { useState, useEffect, useRef } from "react";

const Default = (url, defOptions = {}, callback) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(defOptions);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const callbackRef = useRef(callback);

  const abortController = useRef();

  useEffect(() => {
    callbackRef.current && data && callbackRef.current(data);
  }, [data]);

  useEffect(() => {
    setQuery(
      Object.keys(options?.query ?? {})
        .filter(
          (param) =>
            options?.query[param] !== undefined &&
            options?.query[param] !== null &&
            options?.query[param] !== ""
        )
        .map((param) => {
          let value = options.query[param];

          if (typeof value === "string") value = value.replace(" ", "%20");

          return `${param}=${value}`;
        })
        .join("&")
    );
  }, [options]);

  useEffect(() => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${url}?${query.length > 0 ? query : ""}`,
          {
            ...options,
            signal: abortController.current?.signal,
          }
        );
        const json = await response.json();

        if (response.ok) setData(json);
        else setError(true);
      } catch (err) {
        if (err.name !== "AbortError") setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, query]);

  return { loading, data, error, setOptions, query };
};

export { Default as useFetch };
