import {
  DictionarySettingsDeleteParams,
  DictionarySettingsPostParams,
  DictionarySettingsPutParams,
} from "@/shared/api/dictionary-settings/model";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import DictionarySettings from "../api";

export const usePostDictionarySettings = (id: string) => {
  const hook = useMutation({
    mutationKey: [`post/dictionarySettings/${id}`],
    mutationFn: (data: DictionarySettingsPostParams) =>
      DictionarySettings.post({
        data,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          //Authorization: accessToken,
        },
      }),
    onSuccess: () => {
      //queryClient.invalidateQueries({ queryKey: ["get/dictionary"] });
    },
  });

  return hook;
};

export const usePutDictionarySettings = (id: string) => {
  const queryClient = useQueryClient();

  const hook = useMutation({
    mutationKey: [`put/dictionarySettings/${id}`],
    mutationFn: (data: DictionarySettingsPutParams) =>
      DictionarySettings.put({
        data,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          //Authorization: accessToken,
        },
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`get/dictionary/${id}`] });
    },
  });

  return hook;
};

export const useDeleteDictionarySettings = (id: string) => {
  const hook = useMutation({
    mutationKey: [`delete/dictionarySettings/${id}`],
    mutationFn: (data: DictionarySettingsDeleteParams) =>
      DictionarySettings.delete({
        data,
        headers: {
          Accept: "multipart/form-data",
          "Content-Type": "multipart/form-data",
          //Authorization: accessToken,
        },
      }),
  });

  return hook;
};
