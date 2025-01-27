import { styled } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {z} from "zod"

import { useAuth } from "@/entities/Auth/hooks/useAuth";
import { AuthPostParams } from "@/shared/api/auth/model";
import { Box, Button, Input } from "@/shared/ui";

const AuthPostParamsSchema = z.object({
  login: z.string().nonempty({ message: "Login can't be empty" }),
  password: z
    .string()
    .nonempty({ message: "Password can't be empty" })
    .min(6, { message: "Password must contain at least 6 character(s)" }),
});

export const LoginSubmitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { login: "", password: "" },
    mode: "onChange",
    resolver: zodResolver(AuthPostParamsSchema)
  });

  const {mutate} = useAuth();

  const onSubmit: SubmitHandler<AuthPostParams> = async ({login, password}) => {
    mutate({login, password})
  };

  return <form onSubmit={handleSubmit(onSubmit)}>
    <Box flex grow gap="20px">
      <StyledInput
        {...register("login", { required: "Login is required" })}
        errorMessage={errors.login ? errors.login.message : ""}
        onChange={(event: any) => {
          setValue("login", event.target.value);
        }}
        placeholder="login"
      />
      <StyledInput
        {...register("password", { required: "Password is required" })}
        errorMessage={errors.password ? errors.password.message : ""}
        onChange={(event: any) => {
          setValue("password", event.target.value);
        }}
        placeholder="password"
      />
    </Box>
    <Button
      type="submit"
      caption="Enter"
      color="inherit"
      icon="arrowRight"
      iconAtTheEnd
      variant="text"
      sx={{ paddingLeft: 1.5 }}
    />
  </form>
}

const StyledInput = styled(Input)(() => ({
  color: "white",
  "& label.Mui-focused": {
    color: "white",
  },
  "& label": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "#D3D3D3",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
  display: "block",
}));