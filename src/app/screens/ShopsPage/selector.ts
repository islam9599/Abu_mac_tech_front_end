import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopsPage;

export const retrieveAllProducts = createSelector(
  selectShopPage,
  (ShopsPage) => ShopsPage.allProducts
);
export const retrieveProductsByPrice = createSelector(
  selectShopPage,
  (shopsPage) => shopsPage.productsByPrice
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
  (shopsPage) => shopsPage.chosenProduct
);
export const retrieveProductReviews = createSelector(
  selectShopPage,
  (shopsPage) => shopsPage.productReviews
);
