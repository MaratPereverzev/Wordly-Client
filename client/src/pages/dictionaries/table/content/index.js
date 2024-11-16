import { Box, EmptyData, Error } from "@components";
import { useGetDictionary } from "@fetch/useDictionaries";
import { styled } from "@mui/material";
import { ItemBox } from "./itemBox";

export const TableContent = () => {
  const { data, isError } = useGetDictionary();

  return (
    <StyledTableContentContainer flex grow column>
      {(isError && <Error />) ||
        (data && data?.rows?.length && (
          <StyledDataContainer grid templateColumns="1fr 1fr 1fr" gap>
            {data.rows.map((dictionary, index) => (
              <ItemBox data={dictionary} key={index} />
            ))}
          </StyledDataContainer>
        )) ||
        (data?.rows?.length === 0 && (
          <EmptyData
            message="It seems, you don't have any dictionary yet"
            icon="empty"
          />
        ))}
    </StyledTableContentContainer>
  );
};

const StyledTableContentContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background,
  height: "100%",
  overflowY: "auto",
}));

const StyledDataContainer = styled(Box)(() => ({
  gap: "8px",
  padding: "0 8px",
}));
