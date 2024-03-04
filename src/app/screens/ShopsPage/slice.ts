import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  allProducts: [],
  randomBrands: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
};

const ShopPageSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
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
  setAllProducts,
  setRandomBrands,
  setChosenShop,
  setTargetProducts,
  setChosenProduct,
} = ShopPageSlice.actions;

const ShopPageReducer = ShopPageSlice.reducer;
export default ShopPageReducer;
