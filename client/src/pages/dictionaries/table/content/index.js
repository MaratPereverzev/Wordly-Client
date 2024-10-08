import { Box, EmptyData, Error, Loading } from "@components";
import { ItemBox } from "./itemBox";
import { styled } from "@mui/material";

export const TableContent = (props) => {
  const { response } = props;

  const { data, isLoading, isError } = response;

  return (
    <StyledTableContentContainer flex grow column>
      {(isLoading && <Loading />) ||
        (isError && <Error />) ||
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

const StyledTableContentContainer = styled(Box)(() => ({
  height: "100%",
  overflowY: "auto",
}));

const StyledDataContainer = styled(Box)(() => ({ gap: 1, p: 1, py: 0 }));