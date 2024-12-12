import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { dispatchEvent } from "utils";
import Word from "../services/word";
import { useParams } from "react-router-dom";
import { useAppSelector } from "hooks/useSelector";

export const useGetWords = () => {
  const { id } = useParams();

  const hook = useQuery({
    queryKey: [`words.${id}`],
    queryFn: () => Word.getAll(),
    select: (data) => data.data,
  });

  return hook;
};

export const useGetWordsById = () => {};

export const usePostWords = () => {
  const user = useAppSelector((store) => store.userReducer);
  const { id } = useParams();
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`words.post.${id}`],
    mutationFn: (wordData) =>
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
      queryClient.invalidateQueries({ queryKey: [`words.${id}`] });
      dispatchEvent("dialogTrigger", { opened: false });
    },
  });

  return hook;
};
