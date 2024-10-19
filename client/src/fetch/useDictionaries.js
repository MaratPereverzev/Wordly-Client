import { useFetch } from "@hooks";
import { setPagination } from "@store/dictionaries";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dispatchEvent } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import Dictionary from "../services/dictionary";

export const useGetDictionary = () => {
  const user = useSelector((state) => state.user);
  const query = useSelector((store) => store.dictionaries.query);

  const dispatch = useDispatch();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["dictionaries", query],
    queryFn: () =>
      Dictionary.getAll({
        params: {
          limit: query.limit,
          offset: query.offset,
          caption: query?.caption,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
      }),
    select: ({ data }) => data,
    enabled: !!user?.accessToken,
  });

  dispatch(setPagination({ count: data?.count }));

  return { isLoading, data, isError };
};

export const useGetByIdDictionary = ({ id }) => {
  const user = useSelector((store) => store.user);

  const { isLoading, isError, data } = useQuery({
    queryKey: [`dictionaries/${id}`],
    queryFn: () =>
      Dictionary.getById({
        query: {
          id,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
      }),
    select: ({ data }) => data,
    enabled: !!user?.accessToken,
  });

  return { isLoading, isError, data };
};

export const usePostDictionary = (dictionaryData) => {
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
  }

  return { ...data, error, mutate };
};

export const useDelDictionary = (dictionaryData) => {
  const user = useSelector((state) => state.user);
  const queryClient = useQueryClient();

  const { data, isError, mutate } = useMutation({
    mutationKey: ["dictionaries/delete", dictionaryData],
    mutationFn: () =>
      Dictionary.delete({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
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
      message: "deleted successfully",
    });
  }

  return { data, isError, mutate };
};

export const usePutDictionary = async (dictionaryData) => {
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
