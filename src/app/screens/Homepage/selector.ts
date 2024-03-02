import { createSelector } from "reselect";
import { AppRootState } from "../../types/screen";

const selectHomePage = (state: AppRootState) => state.homePage;

export const retrieveTopBrands = createSelector(
  selectHomePage,
  (HomePage) => HomePage.topBrands
);
export const retrieveSaleProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.saleProducts
);
export const retrieveTrendProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.trendProducts
);
export const retrieveBestProducts = createSelector(
  selectHomePage,
  (HomePage) => HomePage.bestProducts
);
export const retrieveNewArrivals = createSelector(
  selectHomePage,
  (HomePage) => HomePage.newArrivals
);
