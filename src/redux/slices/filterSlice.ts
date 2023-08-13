import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export enum SortPropEnum {
  RATING = "rating",
  PRICE = "price",
  TITLE = "title",
}
export type SortType = {
  name: string;
  sortProp: SortPropEnum;
};
export interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  sortMethod: string;
  currentPage: number;
  sortType: SortType;
}

const initialState: FilterSliceState = {
  searchValue: "",
  categoryId: 0,
  sortMethod: "asc",
  currentPage: 1,
  sortType: {
    name: "popularity",
    sortProp: SortPropEnum.RATING,
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },
    setSortMethod(state, action: PayloadAction<string>) {
      state.sortMethod = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sortType = action.payload.sortType;
      state.categoryId = Number(action.payload.categoryId);
      state.sortMethod = action.payload.sortMethod;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSortProp = (state: RootState) =>
  state.filter.sortType.sortProp;
export const {
  setCategoryId,
  setSortType,
  setSortMethod,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
