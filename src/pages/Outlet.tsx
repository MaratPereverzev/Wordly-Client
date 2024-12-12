import { Suspense } from "react";
import { Outlet as OutletReact } from "react-router-dom";

import { Box, Loading } from "@/shared/ui";

export const Outlet = () => {
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
        <OutletReact />
      </Suspense>
    </Box>
  );
};
