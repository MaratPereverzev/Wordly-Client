import { Box, Button, Text, Input } from "@components";
import { useContext } from "react";
import { UserContextData } from "@context";
import { dispatchEvent, setLocalStorageValue } from "@utils";
import useFetch from "use-http";

const Default = () => {
  const user = useContext(UserContextData);

  const { post } = useFetch("http://localhost:8080/api/auth/login", {
    method: "POST",
    body: { login: "AdminHeHeHe", password: "123321" },
  });

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
          <Box flex column gap>
            <Input label="login" />
            <Input label="password" />
          </Box>
        </Box>
        <Box flex jc="flex-end">
          <Button
            caption="Enter"
            color="inherit"
            icon="explore"
            iconAtTheEnd
            variant="text"
            sx={{ paddingLeft: 1.5 }}
            onClick={async () => {
              const data = await post();

              user.Auth = data.isAuth;
              dispatchEvent("onLogin");
              setLocalStorageValue("isAuth", true);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export { Default as Login };
