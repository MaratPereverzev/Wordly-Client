import { useDictionaryStore } from"@/entities/Dictionary/store";
import { Pagination as PaginationMui } from"@/shared/ui";

export const Pagination = () => {
  const {changeCurrentPage, totalPages, currentPage} = useDictionaryStore(state => state.pagination)

  return (
    <>
      {
        totalPages > 1 ? (
          <PaginationMui
          count={totalPages}
          page={currentPage}
          onChange={(_: any, pageToShow: number) => {
            changeCurrentPage(pageToShow)
          }}
        />     
        ): null
      }
    </>
  );
};
