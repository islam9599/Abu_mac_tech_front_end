import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopsPage;

export const retrieveAllProducts = createSelector(
  selectShopPage,
  (ShopsPage) => ShopsPage.allProducts
);
export const retrieveProductsByBrand = createSelector(
  selectShopPage,
  (shopsPage) => shopsPage.productsByBrand
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
