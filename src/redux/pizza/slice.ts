import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PizzaItem, PizzaSliceProps, StatusEnum } from './types';
import { fetchPizzas } from './asyncActions';

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
        state.items = action.payload;
        state.status = StatusEnum.SUCCESS;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = StatusEnum.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
