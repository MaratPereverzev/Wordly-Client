import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { WordGetParams, WordInstance } from "shared/api/word/model";

type WordReducerProps = {
  words: WordInstance[] | null;
  query: WordGetParams;
  loading: boolean;
  error: string | null;
  pagination?: {
    currentPage: number;
    totalPages: number;
    recordsCount: number;
  };
  //selectedWord: WordReducerProps | null;
  //mode?: { isSelectMode?: boolean; selectedItems: { id: number }[] };
};

const initialState: WordReducerProps = {
  words: [],
  query: {
    limit: 10,
    offset: 0,
  },
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 0,
    recordsCount: 0,
  },
};

const wordSlice = createSlice({
  name: "dictionaries",
  initialState,
  reducers: {
    setPagination: (store, { payload }: PayloadAction<{ count: number }>) => {
      store.pagination!.totalPages = Math.ceil(
        (payload.count ?? 1) / store.query!.limit!
      );
    },
    changePage: (store, { payload }: PayloadAction<WordReducerProps>) => {
      store.pagination!.currentPage = payload.pagination!.currentPage;
      store.query!.offset =
        (payload.pagination!.currentPage - 1) * store.query!.limit!;
    },
    changeQuerySearch: (store, { payload }) => {
      store.query!.caption = payload.caption;
    },
  },
});

export const { changePage, setPagination, changeQuerySearch } =
  wordSlice.actions;
export default wordSlice.reducer;
