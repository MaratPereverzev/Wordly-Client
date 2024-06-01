import { Box } from "@mui/material";

const Default = (props) => {
  const {
    sx = {},
    flex,
    column,
    wrap,
    jc,
    ai,
    gap,
    grow,
    center,
    ...other
  } = props;

  if (flex) {
    sx.display = "flex";
    sx.flexDirection = column ? "column" : "row";

    if (wrap) sx.flexWrap = "wrap";
    if (jc) sx.justifyContent = typeof jc === "boolean" ? "center" : jc;
    if (ai) sx.alignItems = typeof ai === "boolean" ? "center" : jc;
    if (center) {
      sx.justifyContent = "center";
      sx.alignItems = "center";
    }
    if (gap) sx.gap = typeof gap === "boolean" ? "10px" : gap;
    if (grow) sx.flexGrow = typeof grow === "boolean" ? 1 : grow;
  }

  return <Box sx={{ m: 0, p: 0, ...sx }} {...other} />;
};

export { Default as Box };
