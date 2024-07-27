import { Box } from "../box";
import { memo } from "react";
import { areEqual } from "@utils";

const iconList = {
  delete: "delete",
  menu: "menu",
  default: "do_not_disturb_on",
  profile: "person",
  search: "search",
  dictionary: "book",
  open: "chevron_right",
  word: "translate",
  saved: "bookmark",
  home: "home",
  filter: "filter_alt",
  sort: "swap_vert",
  more: "keyboard_arrow_down",
  merge: "arrow_and_edge",
  select: "check_box",
  selectOff: "check_box_outline_blank",
  settings: "settings",
  moreOptions: "more_horiz",
  arrowRight: "keyboard_arrow_right",
  logout: "logout",
  edit: "edit",
  addIcon: "add_reaction",
  photo: "image",
  empty: "package_2",
};

const Default = memo((props) => {
  const { icon, sx, sxIcon, ...other } = props;

  return (
    <Box flex ai sx={{ ...sx }}>
      <span className="material-symbols-rounded span" style={sxIcon} {...other}>
        {iconList[icon ?? "default"]}
      </span>
    </Box>
  );
}, areEqual);

export { Default as Icon };
