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

export interface FilterSliceProps {
  categoryId: number;
  searchValue: string;
  currentPage: number;
  sort: SortListItem;
}
