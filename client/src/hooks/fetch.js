import useFetch from "use-http";

const Default = (url, options = {}) => {
  const obj = useFetch(url, options, []);

  return obj;
};

export { Default as useFetch };
