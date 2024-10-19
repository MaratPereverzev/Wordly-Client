import { Icon, Box } from "@components";

const Default = () => {
  return (
    <Box flex column sx={{ height: "120px" }}>
      <Icon
        center
        grow
        icon="error"
        sx={{ color: "red" }}
        sxIcon={{ fontSize: "70px" }}
      />
    </Box>
  );
};

export { Default as Header };
