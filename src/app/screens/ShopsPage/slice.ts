import { createSlice } from "@reduxjs/toolkit";
import { ShopPageState } from "../../types/screen";

const initialState: ShopPageState = {
  allProducts: [],
  productsByPrice: [],
  chosenShop: null,
  targetProducts: [],
  chosenProduct: null,
  productReviews: [],
};

const ShopPageSlice = createSlice({
  name: "shopPage",
  initialState,
  reducers: {
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    },
    setProductsByPrice: (state, action) => {
      state.productsByPrice = action.payload;
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
    setProductReviews: (state, action) => {
      state.productReviews = action.payload;
    },
  },
});

export const {
  setAllProducts,
  setProductsByPrice,
  setChosenShop,
  setTargetProducts,
  setChosenProduct,
  setProductReviews,
} = ShopPageSlice.actions;

const ShopPageReducer = ShopPageSlice.reducer;
export default ShopPageReducer;
