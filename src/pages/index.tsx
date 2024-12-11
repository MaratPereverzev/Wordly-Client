import { Suspense } from "react";
import { Outlet } from "react-router-dom";

import { Box, Loading } from "@/shared/ui";

export const Page = () => {
  return (
    <Box
      flex
      column
      grow
      sx={{
        background: (theme) => theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
    </Box>
  );
};
