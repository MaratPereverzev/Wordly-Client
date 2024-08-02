import { Box, Button, Input, Text } from "@components";
import { UserContextData } from "@context";
import { dispatchEvent } from "@utils";
import { useContext, useRef } from "react";
import axios from "axios";

const Default = () => {
  let user = useContext(UserContextData);
  const login = useRef();
  const password = useRef();

  return (
    <Box
      flex
      grow
      center
      sx={{
        background: "url(/res/img/loginBackground.png)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Box
        flex
        column
        center
        sx={{
          backdropFilter: "blur(4px)",
          width: "40%",
          height: "40%",
          border: ({ palette }) => `1px solid ${palette.divider}`,
          borderRadius: 2,
        }}
      >
        <Box flex center gap="10px" sx={{ p: 3 }}>
          <Box flex center sx={{ width: "45%" }}>
            <img
              src="/res/icons/WordlyDark.png"
              alt="icon"
              style={{ width: "60px" }}
            />
            <Text caption="ordly" sx={{ fontSize: "50px" }} />
          </Box>
          <Box flex column gap ai>
            <Input
              label="login"
              name="login"
              sx={{
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
              }}
              onChange={() => (e) => {
                login.current = e?.target?.value;
              }}
            />
            <Input
              label="password"
              type="password"
              name="password"
              onChange={() => (e) => {
                password.current = e?.target?.value;
              }}
              sx={{
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
              }}
            />
          </Box>
        </Box>
        <Box flex jc="flex-end">
          <Button
            caption="Enter"
            color="inherit"
            icon="arrowRight"
            iconAtTheEnd
            variant="text"
            sx={{ paddingLeft: 1.5 }}
            onClick={async () => {
              try {
                const { data, statusText } = await axios.get(
                  `http://localhost:8080/api/auth/login?login=${login.current}&password=${password.current}`,
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
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { Default as Login };
