import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import {
  WordDeleteParams,
  WordPostParams,
  WordPutParams,
} from "shared/api/word/model";
import { useAppSelector } from "shared/hooks";
import { dispatchEvent } from "shared/utils";
import Word from "../api";

export const useGetWord = () => {
  const word = useAppSelector((state) => state.wordReducer);
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: ["get/words"],
    queryFn: () =>
      Word.getAll({
        data: word.query,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    select: (data) => data.data,
  });

  return { data, isLoading, isError };
};

export const useGetWordById = (id: string) => {
  const { data, isLoading, isError } = useSuspenseQuery({
    queryKey: [`get/words/${id}`],
    queryFn: () =>
      Word.getById({
        data: { id },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    select: (data) => data.data,
  });

  return { data, isLoading, isError };
};

export const usePostWord = (id: string) => {
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/word/${id}`],
    mutationFn: (wordData: WordPostParams) =>
      Word.post({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        data: wordData,
      }),
    onSuccess: () => {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "A new word added successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`get/word`] });
      dispatchEvent("dialogTrigger", { opened: false });
    },
  });

  return hook;
};

export const usePutWord = (id: string) => {
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/word/${id}`],
    mutationFn: (wordData: WordPutParams) =>
      Word.put({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        data: { ...wordData, id },
      }),
    onSuccess: () => {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "A new word added successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`get/word`] });
      dispatchEvent("dialogTrigger", { opened: false });
    },
  });

  return hook;
};

export const useDeleteWord = (id: string) => {
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/word/${id}`],
    mutationFn: (wordData: WordDeleteParams) =>
      Word.delete({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        data: wordData,
      }),
    onSuccess: () => {
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "A new word added successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`get/word`] });
      dispatchEvent("dialogTrigger", { opened: false });
    },
  });

  return hook;
};