import { Box, Button, Input, Text } from "@components";
import { UserContextData } from "@context";
import { styled } from "@mui/material";
import { dispatchEvent, setPageHash } from "@utils";
import axios from "axios";
import { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";

const Default = () => {
  let user = useContext(UserContextData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { login: undefined, password: undefined },
    mode: "onChange",
  });

  useEffect(() => {
    setPageHash("login");
  }, []);

  const onSubmit = async ({ login, password }) => {
    try {
      const { data, statusText } = await axios.get(
        `http://localhost:8080/api/auth/login?login=${login}&password=${password}`,
        { responseType: "json" }
      );

      if (statusText === "OK") {
        user.isAuth = data.isAuth;
        user.accessToken = data?.accessToken;
        dispatchEvent("onLogin");
        dispatchEvent("snackbarTrigger", {
          message: "Access granted",
          status: "success",
        });
      } else {
        throw new Error(statusText);
      }
    } catch (err) {
      dispatchEvent("snackbarTrigger", {
        message: err.response.data?.message,
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
              onChange={(event) => {
                setValue("login", event.target.value);
              }}
              placeholder="login"
            />
            <StyledInput
              {...register("password", { required: "Password is required" })}
              errorMessage={errors.password ? errors.password.message : ""}
              onChange={(event) => {
                setValue("password", event.target.value);
              }}
              placeholder="password"
              type="password"
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
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Box>
      </StyledContentContainer>
    </StyledLoginContainer>
  );
};

const StyledLoginContainer = styled(Box)(() => ({
  background: "url(/res/img/loginBackground.png)",
  backgroundSize: "cover",
  backgroundPosition: "center",
}));

const StyledContentContainer = styled(Box)(() => ({
  backdropFilter: "blur(4px)",
  width: "40%",
  height: "60%",
  border: ({ palette }) => `1px solid ${palette.divider}`,
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
export { Default as Login };
