import { Box, Button, Text, Input } from "@components";
import { useContext, useRef } from "react";
import { UserContextData } from "@context";
import { dispatchEvent } from "@utils";
import useFetch from "use-http";

const Default = () => {
  const user = useContext(UserContextData);
  const login = useRef();
  const password = useRef();

  const { get } = useFetch("http://localhost:8080/api/auth/login");

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
        <Box flex center sx={{ p: 3 }}>
          <Box flex center sx={{ width: "45%" }}>
            <img
              src="/res/icons/WordlyDark.png"
              alt="icon"
              style={{ width: "25%" }}
            />
            <Text caption="ordly" sx={{ fontSize: "50px" }} />
          </Box>
          <Box flex column gap ai>
            <Input
              name="login"
              onChange={() => (e) => {
                login.current = e?.target?.value;
              }}
            />
            <Input
              type="password"
              name="password"
              onChange={() => (e) => {
                password.current = e?.target?.value;
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
              const data = await get(
                `?login=${login.current}&password=${password.current}`
              );
              if (data) {
                user.isAuth = data.isAuth;
                dispatchEvent("onLogin");
              }
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { Default as Login };
