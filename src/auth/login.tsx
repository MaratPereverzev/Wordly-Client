import { styled } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, Button, Input, Text } from "@/shared/ui";
import { loginAction } from "@/app/store/user";
import { dispatchEvent, setPageHash } from "@/shared/utils";

export const Login = () => {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { login: undefined, password: undefined },
    mode: "onChange",
  });

  const navigate = useNavigate();

  useEffect(() => {
    setPageHash("login");
  }, []);

  const onSubmit = async ({ login, password }: {login: string, password: string}) => {
    try {
      const { data, statusText } = await axios.get(
        `http://localhost:8080/api/auth/login?login=${login}&password=${password}`,
        { responseType: "json" }
      );

      if (statusText === "OK") {
        dispatch(loginAction({ accessToken: data.accessToken }));
        navigate("/dictionaries");
      } else {
        throw new Error(statusText);
      }
    } catch (err: any) {
      dispatchEvent("snackbarTrigger", {
        message: err.response?.data?.message,
        status: "error",
      });
    }
  };

  return (
    <StyledLoginContainer flex grow center>
      <StyledContentContainer flex column center>
        <Box flex column gap="30px" sx={{ height: "50%" }}>
          <Box flex center>
            <img
              src="/res/icons/WordlyDark.png"
              alt="icon"
              style={{ width: "60px" }}
            />
            <Text caption="ordly" sx={{ fontSize: "50px" }} />
          </Box>
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
          <Box flex jc="flex-end">
            <Button
              type="submit"
              caption="Enter"
              color="inherit"
              icon="arrowRight"
              iconAtTheEnd
              variant="text"
              sx={{ paddingLeft: 1.5 }}
              //onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </StyledContentContainer>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledContentContainer = styled(Box)(({theme}) => ({
  backdropFilter: "blur(4px)",
  width: "40%",
  height: "60%",
  border:`1px solid ${theme.palette.divider}`,
  borderRadius: 2,
}));

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
