import { styled } from "@mui/material";
import { useParams } from "react-router-dom";

import { useGetDictionaryById } from "@/entities/Dictionary/hooks";
import { Result } from "@/features/Word/ui/background-preview.tsx";
import { Box, Button, Text } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";
import { DictionaryDetailTable } from "@/widgets/Dictionary-detail/ui";
import { CreateWordDialog } from "@/widgets/Word/ui/createWord";

const DictionaryDetail = () => {
  const { id } = useParams();
  const { data } = useGetDictionaryById(id!);

  return (
    <Box sx={{ p: 1, overflowY: "auto" }}>
      <Result data={data}/>
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
      {data?.words?.length > 0 && (
        <Box flex center sx={{ p: 2 }}>
          <DictionaryDetailTable
            data={data}
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

export default DictionaryDetail;
