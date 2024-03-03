import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  targetBrands: [],
  randomBrands: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
};

const RestaurantSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setTargetBrands: (state, action) => {
      state.targetBrands = action.payload;
    },
    setRandomBrands: (state, action) => {
      state.randomBrands = action.payload;
    },
    setChosenShop: (state, action) => {
      state.chosenShop = action.payload;
    },
    setTargetProducts: (state, action) => {
      state.targetProducts = action.payload;
    },

    setChosenProduct: (state, action) => {
      state.chosenProduct = action.payload;
    },
  },
});

export const {
  setTargetBrands,
  setRandomBrands,
  setChosenShop,
  setTargetProducts,
  setChosenProduct,
} = RestaurantSlice.actions;

const ShopPageReducer = RestaurantSlice.reducer;
export default ShopPageReducer;
