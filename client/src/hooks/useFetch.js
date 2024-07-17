import { useState, useEffect, useRef } from "react";

const Default = (url, defOptions = {}, callback) => {
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState(defOptions);
  const [data, setData] = useState({});
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");
  const callbackRef = useRef(callback);

  const abortController = useRef();

  useEffect(() => {
    callbackRef.current && data && callbackRef.current(data);
  }, [data]);

  useEffect(() => {
    setQuery(
      Object.keys(options?.queryParams ?? {})
        .filter(
          (param) =>
            options?.queryParams[param] !== undefined &&
            options?.queryParams[param] !== null &&
            options?.queryParams[param] !== ""
        )
        .map((param) => {
          let value = options.queryParams[param];

          if (typeof value === "string") value = value.replace(" ", "%20");

          return `${param}=${value}`;
        })
        .join("&")
    );
  }, [options?.queryParams]);

  useEffect(() => {
    abortController.current?.abort();
    abortController.current = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}?${query ?? ""}`, {
          ...options,
          signal: abortController.current?.signal,
        });
        const json = await response.json();

        if (response.ok) setData(json);
        else setError(true);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [url, options, query]);

  return { loading, data, error, setOptions, query };
};

export { Default as useFetch };
