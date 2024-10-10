import { areEqual } from "@utils";
import { memo } from "react";
import { Box } from "../Box";

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
  exclamation: "error",
};

export const Icon = memo((props) => {
  const { icon, sx, sxIcon, ...other } = props;

  return (
    <Box flex ai sx={{ ...sx }} {...other}>
      <span className="material-symbols-rounded span" style={sxIcon}>
        {iconList[icon ?? "default"]}
      </span>
    </Box>
  );
}, areEqual);
