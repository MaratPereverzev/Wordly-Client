import { Box, ButtonIcon, Input } from "@components";

const Default = (props) => {
  const { sx } = props;
  return (
    <Box flex sx={{ p: 1, ...sx }}>
      <Box flex ai grow jc="space-between">
        some text
      </Box>
      <Box flex ai gap grow jc="flex-end">
        <Box flex ai gap>
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
