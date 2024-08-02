import { UserContextData } from "@context";
import { useFetch } from "@hooks";
import { dispatchEvent } from "@utils";
import { useContext } from "react";

const useGetDictionary = () => {
  const userData = useContext(UserContextData);

  const { response, fetchData, loading, error } = useFetch({
    method: "GET",
    baseURL: "http://localhost:8080/api/private/dictionary",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userData?.accessToken,
    },
  });

  return { ...response, loading, error, get: fetchData };
};

const usePostDictionary = (dictionaryData) => {
  const userData = useContext(UserContextData);

  const { response, loading, error, fetchData } = useFetch({
    method: "POST",
    url: "http://localhost:8080/api/private/dictionary",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userData?.accessToken,
    },
    data: dictionaryData,
  });

  if (response?.status === 200) {
    dispatchEvent("snackbarTrigger", {
      status: "success",
      message: "created successfully",
    });
    dispatchEvent("onReload");
  }

  return { ...response, loading, error, post: fetchData };
};

const useDelDictionary = (dictionaryData) => {
  const { id } = dictionaryData;
  const userData = useContext(UserContextData);

  const { response, loading, error, fetchData } = useFetch({
    method: "DELETE",
    url: `http://localhost:8080/api/private/dictionary?id=${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userData?.accessToken,
    },
  });

  if (response?.status === 200) {
    dispatchEvent("snackbarTrigger", {
      status: "success",
      message: "deleted successfully",
    });
    dispatchEvent("onReload");
  }

  return { ...response, loading, error, del: fetchData };
};

const usePutDictionary = async (dictionaryData) => {
  const userData = useContext(UserContextData);

  const { response, loading, error, fetchData } = useFetch({
    method: "POST",
    url: "http://localhost:8080/api/private/dictionary",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: userData?.accessToken,
    },
    data: dictionaryData,
  });

  if (response?.status === 200) {
    dispatchEvent("snackbarTrigger", {
      status: "success",
      message: "created successfully",
    });
    dispatchEvent("onReload");
  }

  return { ...response, loading, error, put: fetchData };
};

export {
  useDelDictionary,
  useGetDictionary,
  usePostDictionary,
  usePutDictionary,
};
