import { Product } from "./product";
import { Member, Shop } from "./user";

/** React app state */
export interface AppRootState {
  homePage: HomePageState;
}

/** Homepage */
export interface HomePageState {
  topBrands: Shop[];
  saleProducts: Product[];
  trendProducts: Product[];
  bestProducts: Product[];
  newArrivals: Product[];
}
