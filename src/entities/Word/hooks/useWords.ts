import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

import { useUserStore } from "@/app/store/user";
import {
  WordDeleteParams,
  WordPostParams,
  WordPutParams,
} from "@/shared/api/word/model";
import { dispatchEvent } from "@/shared/utils";
import Word from "../api";
import { useWordStore } from "../store";
import { useParams } from "react-router-dom";

export const useGetWord = () => {
  const word = useWordStore((state) => state);
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
    select: ({ data }) => data,
  });

  return { data, isLoading, isError };
};

type ClientWordPostParams = Omit<WordPostParams, "dictionaryId">;

export const usePostWord = () => {
  const { id } = useParams();
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/word/${id}`],
    mutationFn: (wordData: ClientWordPostParams & { id?: string }) =>
      Word.post({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: { ...wordData, dictionaryId: id! },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get/dictionary/${id}`] });
      dispatchEvent("snackbar/trigger", {
        status: "success",
        message: "A new word added successfully",
      });
      dispatchEvent("dialog/trigger", { opened: false });
    },
  });

  return hook;
};

export const useImportWord = () => {
  const { id } = useParams();
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`import/word`],
    mutationFn: (data: { id: string }) =>
      Word.import({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: { ...data, dictionaryId: +id! },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get/dictionary/${id}`] });
      dispatchEvent("snackbar/trigger", {
        status: "success",
        message: "The word imported successfully",
      });
      dispatchEvent("dialog/trigger", { opened: false });
    },
  });

  return hook;
};

export const usePutWord = (id: string) => {
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`post/word`],
    mutationFn: (wordData: WordPutParams) =>
      Word.put({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: { ...wordData, id },
      }),
    onSuccess: () => {
      dispatchEvent("snackbar/trigger", {
        status: "success",
        message: "A new word added successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`get/words`] });
      dispatchEvent("dialog/trigger", { opened: false });
    },
  });

  return hook;
};

export const useDeleteWord = () => {
  const { id } = useParams();
  const accessToken = useUserStore((state) => state.accessToken);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`delete/word`],
    mutationFn: (wordData: WordDeleteParams) =>
      Word.delete({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: accessToken,
        },
        data: wordData,
      }),
    onSuccess: () => {
      dispatchEvent("snackbar/trigger", {
        status: "success",
        message: "A new word added successfully",
      });
      queryClient.invalidateQueries({ queryKey: [`get/dictionary/${id}`] });
      queryClient.invalidateQueries({ queryKey: [`get/word`] });
      dispatchEvent("dialog/trigger", { opened: false });
    },
  });

  return hook;
};
