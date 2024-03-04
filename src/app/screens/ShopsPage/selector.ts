import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopsPage;

export const retrieveAllProducts = createSelector(
  selectShopPage,
  (ShopsPage) => ShopsPage.allProducts
);
export const retrieveRandomRestaurants = createSelector(
  selectShopPage,
  (shopsPage) => shopsPage.randomBrands
);
export const retrieveChosenShop = createSelector(
  selectShopPage,
  (shopsPage) => shopsPage.chosenShop
);
export const retrieveTargetProducts = createSelector(
  selectShopPage,
  (ProductPage) => ProductPage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectShopPage,
  (ProductPage) => ProductPage.chosenProduct
);
