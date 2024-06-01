import { Button } from "@mui/material";

const iconList = {
  menu: "menu",
  default: "do_not_disturb_on",
  account: "person",
};

const Default = (props) => {
  const { sx = {}, variant = "contained", ...other } = props;

  return (
    <Button
      sx={{
        m: 0,
        p: 1,
        minWidth: "min-content",
        minHeight: "min-content",
        color: "black",
        ...sx,
      }}
      variant={variant}
      {...other}
    />
  );
};

const IconButton = (props) => {
  const { icon, sxIcon, ...other } = props;
  return (
    <Default {...other}>
      <span class="material-symbols-rounded">
        {iconList[icon ?? "default"]}
      </span>
    </Default>
  );
};
export { Default as Button, IconButton };
