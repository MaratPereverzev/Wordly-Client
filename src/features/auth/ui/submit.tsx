import { styled } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { useAuth } from "entities/Auth/hooks/useAuth";
import { Box, Button, Input } from "shared/ui";
import { AuthPostParams } from "shared/api/auth/model";

export const LoginSubmitForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<AuthPostParams>({
    defaultValues: { login: undefined, password: undefined },
    mode: "onChange",
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