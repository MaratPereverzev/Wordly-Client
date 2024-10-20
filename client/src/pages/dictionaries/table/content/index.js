import { Box, EmptyData, Error, Loading } from "@components";
import { styled } from "@mui/material";
import { ItemBox } from "./itemBox";
import { Suspense } from "react";

export const TableContent = ({ response }) => {
  const { data, isLoading, isError } = response;

  return (
    <Suspense fallback={<Loading />}>
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
    </Suspense>
  );
};

const StyledTableContentContainer = styled(Box)(() => ({
  height: "100%",
  overflowY: "auto",
}));

const StyledDataContainer = styled(Box)(() => ({
  gap: "8px",
  padding: "0 8px",
}));
