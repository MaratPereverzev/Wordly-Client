import { useDispatch } from "react-redux";

import { changePage } from "entities/Dictionary/store";
import { useAppSelector } from "shared/hooks/useSelector";
import { Pagination as PaginationMui } from "shared/ui";

export const Pagination = () => {
  const {pagination} = useAppSelector(
    (state) => state.dicitonaryReducer
  );

  const dispatch = useDispatch();

  return (
    <>
      {
        pagination.totalPages > 1 ? (
          <PaginationMui
          count={pagination?.totalPages}
          page={pagination?.totalPages}
          onChange={(_: any, value: number) => {
            dispatch(changePage({pageToShow: value}));
          }}
        />     
        ): null
      }
    </>
  );
};
