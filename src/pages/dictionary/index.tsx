import { styled } from "@mui/material";
import { BasicTable, Box, Button, Text } from "components";
import { CreateWordDialog } from "dialog";
import { useGetByIdDictionary } from "fetch/useDictionaries";
import { useParams } from "react-router-dom";
import { dispatchEvent } from "utils";

const Dictionary = () => {
  const { id } = useParams();
  const { data } = useGetByIdDictionary(id!);

  const headRows = ["id", "caption", "description", "actions"];

  return (
    <Box sx={{ p: 1, overflowY: "scroll" }}>
      <Box
        sx={{
          borderRadius: 1,
          width: "100%",
          height: "350px",
          background: data?.medium?.id
            ? `url(http://localhost:8080/api/media?id=${data?.medium.id})`
            : "#f9f6fe",
          backgroundSize: "cover",
        }}
      />
      <StyledContainer>
        <Box flex column grow>
          <StyledCaption caption={data?.caption} />
          <Text caption={data?.description} />
        </Box>
        <Box flex gap>
          <StyledActionButton
            icon="add"
            caption="Add Translation"
            onClick={() => {
              dispatchEvent("onOpenDialog", {
                dialogContent: <CreateWordDialog />,
              });
            }}
          />
          <StyledActionButton
            icon="more"
            sx={{
              backgroundColor: "#D8E4FF",
              color: "#1565C0",
              "&:hover": {
                color: "#D8E4FF",
              },
            }}
          />
        </Box>
      </StyledContainer>
      {data?.words?.rows.length > 0 && (
        <Box sx={{ p: 2 }}>
          <BasicTable
            bodyRows={data.words.rows}
            headRows={headRows}
            alignHeadCell="center"
            alignBodyCell="center"
          />
        </Box>
      )}
    </Box>
  );
};

const StyledActionButton = styled(Button)(() => ({
  height: "27px",
  paddingX: "16px",
  "& p": { fontSize: "16px" },
  "& span": {
    fontSize: "16px",
  },
}));

const StyledCaption = styled(Text)(() => ({
  fontSize: "60px",
  fontWeight: 700,
}));

const StyledContainer = styled(Box)(() => ({
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyCOntent: "space-between",
}));

export default Dictionary;
