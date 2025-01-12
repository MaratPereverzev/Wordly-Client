import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { useUserStore } from "@/app/store/user";
import Auth from "@/entities/Auth/api";
import { AuthPostParams } from "@/shared/api/auth/model";
import { dispatchEvent } from "@/shared/utils";

export const useAuth = () => {
  const login = useUserStore((state) => state.login);
  const navigate = useNavigate();

  const hook = useMutation({
    mutationFn: ({ login, password }: AuthPostParams) =>
      Auth.post({ data: { login, password }, responseType: "json" }),
    onSuccess: ({ data }) => {
      login(data.accessToken);
      navigate("/dictionaries"); //correct the route
    },
    onError: (err) => {
      dispatchEvent("snackbar/trigger", {
        message: err.message,
        status: "error",
      });
    },
  });

  return hook;
};
