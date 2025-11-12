import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export enum SortPropertyNameTypeEnum {
  RATING_ASC = 'популярности ASC',
  RATING_DESK = 'популярности DESK',
  PRICE_ASC = 'цене ASC',
  PRICE_DESK = 'цене DESK',
  ALPHABETICALLY_ASC = 'алфавиту ASC',
  ALPHABETICALLY_DESK = 'алфавиту DESK',
}

export enum SortPropertyTypeEnum {
  RATING_ASC = 'rating',
  RATING_DESK = '-rating',
  PRICE_ASC = 'price',
  PRICE_DESK = '-price',
  ALPHABETICALLY_ASC = 'alphabetically',
  ALPHABETICALLY_DESK = '-alphabetically',
}

export type SortListItem = {
  name: SortPropertyNameTypeEnum;
  sortProperty: SortPropertyTypeEnum;
};

// type SortItem = {
//   name: SortPropertyTypeEnum;
//   sortProperty: SortPropertyTypeEnum;
// };

interface FilterSliceProps {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: SortListItem;
}

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

export const filterSelector = (state: RootState) => state.filter;
export const sortSelector = (state: RootState) => state.filter.sort;

export const { setCategoryId, setSearchValue, setSort, setCurrentPage, setFilters } =
  filterSlice.actions;

export default filterSlice.reducer;
