import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { loginAction } from "@/app/store/user";
import Auth from "@/entities/Auth/api";
import { AuthPostParams } from "@/shared/api/auth/model";
import { useAppDispatch } from "@/shared/hooks";
import { dispatchEvent } from "@/shared/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const hook = useMutation({
    mutationFn: ({ login, password }: AuthPostParams) =>
      Auth.post({ data: { login, password }, responseType: "json" }),
    onSuccess: ({ data }) => {
      dispatch(loginAction({ accessToken: data.accessToken }));
      navigate("/dictionaries");
    },
    onError: (err) => {
      dispatchEvent("snackbarTrigger", {
        message: err.message,
        status: "error",
      });
    },
  });

  return hook;
};
