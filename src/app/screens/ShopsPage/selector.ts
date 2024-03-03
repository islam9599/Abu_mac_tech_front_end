import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectShopPage = (state: AppRootState) => state.shopsPage;

export const retrieveTargetBrands = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.targetBrands
);
export const retrieveRandomRestaurants = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.randomBrands
);
export const retrieveChosenShop = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.chosenShop
);
export const retrieveTargetProducts = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.targetProducts
);
export const retrieveChosenProduct = createSelector(
  selectShopPage,
  (RestaurantPage) => RestaurantPage.chosenProduct
);
