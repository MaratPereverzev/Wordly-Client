import { useParams } from "react-router-dom";
import { Box, Text, Button } from "@components";
import { useGetByIdDictionary } from "@fetch/useDictionaries";
import { styled } from "@mui/material";

export const Dictionary = () => {
  const { id } = useParams();
  const { data } = useGetByIdDictionary({ id });

  console.log(data);
  return (
    <Box sx={{ p: 1 }}>
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
          <StyledActionButton icon="add" caption="Add Translation" />
          <StyledActionButton
            icon="moreOptions"
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
    </Box>
  );
};

const StyledActionButton = styled(Button)(() => ({
  height: "25px",
  paddingX: "16px",
  "& p": { fontSize: "16px" },
  "& span": {
    fontSize: "16px",
  },
}));

const StyledCaption = styled(Text)(() => ({
  fontSize: "60px",
}));

const StyledContainer = styled(Box)(() => ({
  padding: "16px",
  display: "flex",
  alignItems: "center",
  justifyCOntent: "space-between",
}));
