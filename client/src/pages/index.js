import { Box } from "@components";
import { Outlet } from "react-router-dom";

export const Page = () => {
  return (
    <Box
      flex
      column
      grow
      sx={{
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      <Outlet />
    </Box>
  );
};
