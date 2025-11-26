import { createAsyncThunk } from '@reduxjs/toolkit';
import { FetchPizzaParams, PizzaItem } from './types';
import axios from 'axios';

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
