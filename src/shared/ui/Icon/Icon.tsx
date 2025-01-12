import { CSSProperties } from "react";

import { Box } from "../Box";
import { useSettingsStore } from"@/entities/Settings/store";

const iconList = {
  delete: "delete",
  default: "do_not_disturb_on",
  person: "person",
  search: "search",
  dictionary: "book",
  expand: "chevron_right",
  translation: "translate",
  saved: "bookmark",
  home: "home",
  filter: "filter_alt",
  sort: "swap_vert",
  dropdown: "keyboard_arrow_down",
  checkboxFilled: "check_box",
  checkboxEmpty: "check_box_outline_blank",
  settings: "settings",
  more: "more_horiz",
  arrowRight: "keyboard_arrow_right",
  logout: "logout",
  edit: "edit",
  addIcon: "add_reaction",
  image: "image",
  empty: "package_2",
  error: "error",
  add: "add",
  light_mode: "light_mode",
  dark_mode: "dark_mode",
  light_or_dark_mode: "contrast"
};

export type IconListKeys = keyof typeof iconList


type IconProps = {
  icon?: IconListKeys,
  sx?: CSSProperties
}

export const Icon = ({ icon, sx, ...other }: IconProps) => {
  const iconSize = useSettingsStore(state => state.iconSize);

  return (
    <Box flex ai {...other}>
      <span className="material-symbols-rounded span" style={{fontSize: `${iconSize}px`, ...sx}}>
        {iconList[icon ?? "default"]}
      </span>
    </Box>
  );
};
