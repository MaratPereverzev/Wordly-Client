import { Box } from "../Box";

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
};

export const Icon = ({ icon, sxIcon, ...other }) => {
  return (
    <Box flex ai {...other}>
      <span className="material-symbols-rounded span" style={sxIcon}>
        {iconList[icon ?? "default"]}
      </span>
    </Box>
  );
};
