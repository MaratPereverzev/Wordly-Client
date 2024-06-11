import { Box, Button, ButtonIcon } from "@components";
import { useState } from "react";

const Default = (props) => {
  const [, setRender] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <Box
      sx={{
        width: open ? 200 : 55,
        border: "1px solid black",
        p: 2,
        transition: "width 100ms ease-out",
      }}
    >
      <ButtonIcon />
      <Button
        caption={"hello"}
        icon="dictionary"
        onClick={() => {
          setOpen((prev) => !prev);
          setRender((prev) => !prev);
        }}
      />
    </Box>
  );
};

export { Default as Test };
