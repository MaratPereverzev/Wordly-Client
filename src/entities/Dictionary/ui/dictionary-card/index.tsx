import { Checkbox, styled } from "@mui/material";
import { JSX } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { changeChecked } from "@/entities/Dictionary/store";
import { DeleteDictionaryDialog } from "@/features/Dictionary/ui/modal-content";
import { DictionaryInstance } from "@/shared/api/dictionary/model";
import { useAppSelector } from "@/shared/hooks/useSelector";
import { Box, Button, ButtonIcon, Text } from "@/shared/ui";
import { dispatchEvent } from "@/shared/utils";

type DictionaryCardProps = {
  data:  DictionaryInstance
}

export const DictionaryCard = ({ data }: DictionaryCardProps): JSX.Element => {
  const navigate = useNavigate();
  const mode = useAppSelector((state) => state.dicitonaryReducer.mode);
  const dispatch = useDispatch();

  return (
    <StyledItemContainer flex jc>
      <Box flex column grow sx={{ p: 1 }}>
        <Box
          flex
          column
          grow
          sx={{
            background: data?.media
              ? `url(http://localhost:8080/api/media?id=${data?.media})`
              : "#f9f6fe",
            ...imageSx,
          }}
        />
        <Box flex sx={{ p: 1 }} center>
          {mode?.isSelectMode && (
            <Checkbox
              checked={
                !!mode.selectedItems.find(
                  (dictionary: any) => dictionary.id === data.id
                )
              }
              onChange={(event) => {
                dispatch(changeChecked(data));
              }}
            />
          )}
          <Box flex column grow>
            <StyledCaptionText caption={data?.caption} />
            <StyledDescriptionText caption={data?.description} />
          </Box>
          <Box flex gap="10px">
            <StyledActionButton
              caption="view"
              sx={{
                backgroundColor: ({ palette }) => palette.primary.main,
              }}
              sxText={{
                color: ({ palette }) => palette.primary.contrastText,
                fontSize: "12px",
              }}
              onClick={() => {
                navigate(`${data.id}`);
              }}
            />
            <StyledDeleteButton
              onClick={() => {
                dispatchEvent("onOpenDialog", {
                  dialogContent: <DeleteDictionaryDialog id={data.id} />,
                });
              }}
            />
          </Box>
        </Box>
      </Box>
    </StyledItemContainer>
  );
};

const imageSx = {
  p: 1,
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  borderTopRightRadius: "8px",
  borderTopLeftRadius: "8px",
};

const StyledItemContainer = styled(Box)(({ theme }) => ({
  aspectRatio: "16/10",
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: "8px",
}));

const StyledDeleteButton = styled(ButtonIcon)(({ theme }) => ({
  color: theme.palette.text.primary,
  "&:hover": { color: "#E41F1F" },
  transition: "color 200ms ease-in-out",
  padding: 0,
}));

const StyledActionButton = styled(Button)(() => ({
  background: "black",
  borderRadius: "20px",
  justifyContent: "center",
  width: "50px",
}));

const StyledDescriptionText = styled(Text)(() => ({
  fontSize: "12px",
  color: "grey",
  grow: 1,
}));

const StyledCaptionText = styled(Text)(() => ({ fontSize: "20px" }));
