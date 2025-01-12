import { Box, Icon } from"@/shared/ui";

export const Header = () => {
  return (
    <Box center grow flex column sx={{ height: "120px" }}>
      <Icon
        icon="error"
        sx={{ 
          color: "red",
          fontSize: "70px",
         }}
      />
    </Box>
  );
};
