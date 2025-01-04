import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useUserStore } from "app/store/user";
import { useDictionaryStore } from "entities/Dictionary/store";
import {
  DicitonaryPutParams,
  DictionaryDeleteParams,
  DictionaryPostParams,
} from "shared/api/dictionary/model";
import { dispatchEvent } from "shared/utils";
import Dictionary from "../api";

export const useGetDictionary = () => {
  const query = useDictionaryStore((state) => state.query);
  const setTotalPages = useDictionaryStore(
    (state) => state.pagination.setTotalPages
  );

  const { isLoading, data, isError } = useSuspenseQuery({
    queryKey: ["get/dictionary", query],
    queryFn: () =>
      Dictionary.getAll({
        params: query,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    select: ({ data }) => data,
  });

  setTotalPages(data.count);

  return { isLoading, data, isError };
};

export const useGetDictionaryById = (id: string) => {
  const { isLoading, isError, data } = useSuspenseQuery({
    queryKey: [`get/dictionary/${id}`],
    queryFn: () =>
      Dictionary.getById({
        data: { id },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    select: ({ data }) => data,
  });

  return { isLoading, isError, data };
};

export const usePostDictionary = (id: string) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/dictionary/${id}`],
    mutationFn: (data: DictionaryPostParams) =>
      Dictionary.post({
        data,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get/dictionary"] });
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
    },
  });

  return hook;
};

export const usePutDictionary = async (id: string) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`put/dictionary/${id}`],
    mutationFn: (data: DicitonaryPutParams) =>
      Dictionary.put({
        data: { ...data, id },
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get/dictionary"] });
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
    },
  });

  return hook;
};

export const useDeleteDictionary = (id: string) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`delete/dictionary/${id}`],
    mutationFn: (data: DictionaryDeleteParams) =>
      Dictionary.delete({
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get/dictionary"] });
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "deleted successfully",
      });
    },
  });

  return hook;
};
