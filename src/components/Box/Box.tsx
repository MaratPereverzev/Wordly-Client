import { Box as BoxMui, BoxProps, SxProps, Theme } from "@mui/material";

type CustomBoxProps = Omit<BoxProps, "flex" | "gap"> & {
  flex?: boolean; 
  column?: boolean;
  wrap?: boolean;
  jc?: boolean | string;
  ai?: boolean | string;
  gap?: boolean | string;
  grow?: boolean | number;
  center?: boolean;
  grid?: boolean;
  columnWidth?: boolean | number | string;
  rowWidth?: boolean | number | string;
  gridFlow?: boolean;
  gridTemplate?: string;
  templateColumns?: string;
};

export const Box = ({
  sx = {},
  flex,
  column,
  wrap,
  jc,
  ai,
  gap,
  grow,
  center,
  grid,
  columnWidth,
  rowWidth,
  gridFlow,
  gridTemplate,
  templateColumns,
  ...other
}: CustomBoxProps) => {
  if (flex && grid) throw new Error("flex && grid display at the same time");

  const updatedSx: React.CSSProperties = { ...(sx as React.CSSProperties)};

  if (flex) {
    updatedSx.display = "flex";
    updatedSx.flexDirection = column ? "column" : "row";

    if (wrap) updatedSx.flexWrap = "wrap";
    if (jc) updatedSx.justifyContent = typeof jc === "boolean" ? "center" : jc;
    if (ai) updatedSx.alignItems = typeof ai === "boolean" ? "center" : ai;
    if (center) {
      updatedSx.justifyContent = "center";
      updatedSx.alignItems = "center";
    }
    if (gap) updatedSx.gap = typeof gap === "boolean" ? "10px" : gap;
    if (grow) updatedSx.flexGrow = typeof grow === "boolean" ? 1 : grow;
  }

  if (grid) {
    updatedSx.display = "grid";
    if (columnWidth)
      updatedSx.gridAutoColumns = typeof columnWidth === "boolean" ? 1 : columnWidth;
    if (rowWidth)
      updatedSx.gridAutoRows = typeof rowWidth === "boolean" ? 1 : rowWidth;
    if (gridFlow)
      updatedSx.gridAutoFlow = typeof gridFlow === "boolean" ? "row" : gridFlow;
    if (templateColumns) updatedSx.gridTemplateColumns = templateColumns;
    if (gridTemplate) updatedSx.gridTemplate = gridTemplate;
    if (gap) updatedSx.gap = typeof gap === "boolean" ? "10px" : gap;
  }

  return <BoxMui sx={updatedSx} {...other} />;
};