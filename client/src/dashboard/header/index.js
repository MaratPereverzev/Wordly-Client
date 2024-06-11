import { Box, ButtonIcon, Input } from "@components";
import { dispatchEvent } from "@utils";

const Default = (props) => {
  return (
    <Box flex sx={{ border: "1px solid black" }}>
      <Box flex ai jc="space-between">
        <ButtonIcon
          variant="text"
          icon="menu"
          sx={{ m: 1 }}
          onClick={() => {
            dispatchEvent("sidebarOpen");
          }}
        />
      </Box>
      <Box flex ai grow sx={{ m: 1 }} jc="space-between">
        some text
      </Box>
      <Box flex ai gap grow jc="flex-end">
        <Box flex ai gap sx={{ m: 1 }}>
          <Input
            icon="search"
            placeholder="Search"
            sx={{
              ".css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "20px",
                height: "30px",
                p: 1,
              },
              ".css-1ua80n0-MuiInputBase-input-MuiOutlinedInput-input": {
                p: 0,
              },
            }}
          />
          <ButtonIcon icon="account" />
        </Box>
      </Box>
    </Box>
  );
};

export { Default as Header };
