import { useFetch } from "hooks";
import { setPagination } from "store/dictionaries";
import {
  useMutation,
  useQuery,
  useSuspenseQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { dispatchEvent } from "utils";
import { useDispatch, useSelector } from "react-redux";
import Dictionary from "../services/dictionary";
import Word from "../services/word";
import { useAppSelector } from "hooks/useSelector";

export const useGetDictionary = () => {
  const user = useAppSelector((state) => state.userReducer);
  const query = useAppSelector((store) => store.dicitonariesReducer.query);

  const dispatch = useDispatch();

  const { isLoading, data, isError } = useSuspenseQuery({
    queryKey: ["dictionaries", query],
    queryFn: () =>
      Dictionary.getAll({
        params: {
          limit: query?.limit,
          offset: query?.offset,
          caption: query?.caption,
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
      }),
    select: ({ data }) => data,
  });

  dispatch(setPagination({ pagination: { recordsCount: data.count } }));

  return { isLoading, data, isError };
};

export const useGetByIdDictionary = (id: string) => {
  const user = useAppSelector((store) => store.userReducer);

  const { isLoading, isError, data } = useSuspenseQuery({
    queryKey: [`dictionaries/${id}`],
    queryFn: () =>
      Dictionary.getById({
        data: {
          query: {
            id,
          },
        },
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
      }),
    select: ({ data }) => data,
  });

  const { data: dataWords } = useQuery({
    queryKey: [`words/${id}`],
    queryFn: () =>
      Word.getAll({
        data: {
          query: {
            dictionaryId: id,
          },
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

  data.words = dataWords;

  return { isLoading, isError, data };
};

export const usePostDictionary = () => {
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: ["dictionaries/post"],
    mutationFn: (data) =>
      Dictionary.post({
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          Authorization: user.accessToken,
        },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionaries"] });
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "created successfully",
      });
    },
  });

  return hook;
};

export const useDelDictionary = () => {
  const user = useAppSelector((state) => state.userReducer);
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: ["dictionaries/delete"],
    mutationFn: (data) =>
      Dictionary.delete({
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: user.accessToken,
        },
        data,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dictionaries"] });
      dispatchEvent("snackbarTrigger", {
        status: "success",
        message: "deleted successfully",
      });
    },
  });

  return hook;
};

export const usePutDictionary = async (dictionaryData: {
  [index: string]: string;
}) => {
  const user = useAppSelector((state) => state.userReducer);

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
  }

  return { ...response, loading, error, put: fetchData };
};
