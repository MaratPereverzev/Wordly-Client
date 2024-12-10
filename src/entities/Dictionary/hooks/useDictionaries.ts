import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import {
  DicitonaryPutParams,
  DictionaryDeleteParams,
  DictionaryPostParams,
} from "shared/api/dictionary/model";
import { useAppSelector } from "shared/hooks/useSelector";
import { setPagination } from "entities/Dictionary/store";
import { dispatchEvent } from "shared/utils";
import Dictionary from "../api";

export const useGetDictionary = () => {
  const query = useAppSelector((state) => state.dicitonaryReducer.query);

  const dispatch = useDispatch();

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

  dispatch(setPagination({ count: data.length }));

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
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/dictionary/${id}`],
    mutationFn: (data: DictionaryPostParams) =>
      Dictionary.post({
        data,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: user.accessToken,
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
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`put/dictionary/${id}`],
    mutationFn: (data: DicitonaryPutParams) =>
      Dictionary.put({
        data: { ...data, id },
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: user.accessToken,
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
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`delete/dictionary/${id}`],
    mutationFn: (data: DictionaryDeleteParams) =>
      Dictionary.delete({
        data,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
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
