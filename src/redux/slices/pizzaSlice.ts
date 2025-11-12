import axios from 'axios';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

enum StatusEnum {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

interface PizzaSliceProps {
  items: PizzaItem[];
  status: StatusEnum;
}

export type FetchPizzaParams = {
  category: string;
  order: string;
  sortBy: string;
  search: string;
  currentPage: string;
};

export const fetchPizzas = createAsyncThunk<PizzaItem[], FetchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, order, sortBy, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://659657ee6bb4ec36ca026645.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const initialState: PizzaSliceProps = {
  items: [],
  status: StatusEnum.LOADING,
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = StatusEnum.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<PizzaItem[]>) => {
        // мб не надо PayloadAction<PizzaItem[]>
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR;
        state.items = [];
      });
  },
});

export const pizzaSelector = (state: RootState) => state.pizza;

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
