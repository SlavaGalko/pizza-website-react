import axios from "axios";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

type PizzaItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
  rating: number;
};
export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}
interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export type FetchPizzasArg = {
  category: string;
  sortProp: string;
  sortMethod: string;
  search: string;
  currentPage: number;
};
export const fetchPizzas = createAsyncThunk(
  "pizzas/fetchPizzasStatus",
  async (params: FetchPizzasArg) => {
    const { category, sortProp, sortMethod, search, currentPage } = params;
    const { data } = await axios.get<PizzaItem[]>(
      `https://644feb3cba9f39c6ab6fd55e.mockapi.io/pizzas?page=${currentPage}&limit=4&${category}&sortBy=${sortProp}&order=${sortMethod}${search}`
    );
    return data as PizzaItem[];
  }
);

export const pizzasSlice = createSlice({
  name: "pizzas",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<PizzaItem[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.status = Status.LOADING;
    });
    builder.addCase(fetchPizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchPizzas.rejected, (state, action) => {
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectPizzas = (state: RootState) => state.pizzas;
export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
