import { useFetch } from "@hooks";
import { dispatchEvent } from "@utils";
import { useSelector } from "react-redux";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Dictionary from "../services/dictionary";

const useGetDictionary = () => {
  const user = useSelector((state) => state.user);

  const { isLoading, data, isError } = useQuery({
    queryKey: ["dictionaries"],
    queryFn: () =>
      Dictionary.getAll({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
      }),
    select: ({ data }) => data,
    enabled: !!user?.accessToken,
  });

  return { isLoading, data, isError };
};

const usePostDictionary = (dictionaryData) => {
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { error, data, mutate } = useMutation({
    mutationKey: ["dictionaries/post", dictionaryData],
    mutationFn: () =>
      Dictionary.post({
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: user.accessToken,
        },
        data: dictionaryData,
      }),
    enabled: !!user?.accessToken,
    onSuccess: () => {
      queryClient.invalidateQueries(["dictionaries"]);
    },
  });

  if (data?.status === 200) {
    dispatchEvent("snackbarTrigger", {
      status: "success",
      message: "created successfully",
    });
    dispatchEvent("onReload");
  }

  return { ...data, error, mutate };
};

const useDelDictionary = (dictionaryData) => {
  const { id } = dictionaryData;
  const { user } = useSelector((state) => state.login);

  const { response, loading, error, fetchData } = useFetch({
    method: "DELETE",
    url: `http://localhost:8080/api/private/dictionary?id=${id}`,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: user?.accessToken,
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
  const { user } = useSelector((state) => state.login);

  const { response, loading, error, fetchData } = useFetch({
    method: "POST",
    url: "http://localhost:8080/api/private/dictionary",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: user?.accessToken,
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
