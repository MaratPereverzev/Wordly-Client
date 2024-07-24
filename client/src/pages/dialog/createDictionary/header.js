import { Box } from "@components";

const Default = (props) => {
  return (
    <Box
      flex
      jc="flex-end"
      className="createDictionary header"
      sx={{
        background: 'url("https://wallpapercave.com/wp/wp6764795.jpg")',
        backgroundPosition: "cetner",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "35%",
      }}
    />
  );
};

export { Default as Header };
