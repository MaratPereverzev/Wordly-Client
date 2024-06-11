import { Box } from "../box";

const iconList = {
  menu: "menu",
  default: "do_not_disturb_on",
  account: "person",
  search: "search",
  dictionary: "book",
};

const Default = (props) => {
  const { icon, sx, ...other } = props;

  return (
    <Box flex ai sx={{ ...sx }}>
      <span className="material-symbols-rounded" {...other}>
        {iconList[icon ?? "default"]}
      </span>
    </Box>
  );
};

export { Default as Icon };
