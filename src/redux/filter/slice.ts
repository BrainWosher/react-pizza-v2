import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  FilterSliceProps,
  SortListItem,
  SortPropertyNameTypeEnum,
  SortPropertyTypeEnum,
} from './types';

const initialState: FilterSliceProps = {
  categoryId: 0,
  searchValue: '',
  currentPage: 1,
  sort: {
    name: SortPropertyNameTypeEnum.RATING_ASC,
    sortProperty: SortPropertyTypeEnum.RATING_ASC,
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<SortListItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceProps>) {
      state.sort = action.payload.sort;
      state.currentPage = Number(action.payload.currentPage);
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
