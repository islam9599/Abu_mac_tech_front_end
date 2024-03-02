import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../types/screen";

const initialState: HomePageState = {
  topBrands: [],
  saleProducts: [],
  trendProducts: [],
  bestProducts: [],
  newArrivals: [],
};

const HomePageSlice = createSlice({
  name: "homePage",
  initialState,
  reducers: {
    setTopBrands: (state, action) => {
      state.topBrands = action.payload;
    },
    setSaleProducts: (state, action) => {
      state.saleProducts = action.payload;
    },
    setTrendProducts: (state, action) => {
      state.trendProducts = action.payload;
    },
    setBestProducts: (state, action) => {
      state.bestProducts = action.payload;
    },
    setNewArrivals: (state, action) => {
      state.newArrivals = action.payload;
    },
  },
});

export const {
  setBestProducts,
  setNewArrivals,
  setSaleProducts,
  setTopBrands,
  setTrendProducts,
} = HomePageSlice.actions;

const HomePageReducer = HomePageSlice.reducer;
export default HomePageReducer;
