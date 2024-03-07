import { Order } from "./order";
import { Product } from "./product";
import { Member, Shop } from "./user";

/** React app state */
export interface AppRootState {
  homePage: HomePageState;
  shopsPage: ShopPageState;
  ordersPage: OrdersPageState;
}

/** Homepage */
export interface HomePageState {
  topBrands: Shop[];
  saleProducts: Product[];
  trendProducts: Product[];
  bestProducts: Product[];
  newArrivals: Product[];
}

/** Shop */

export interface ShopPageState {
  allProducts: Product[];
  productsByBrand: Shop[];
  chosenShop: Shop | null;
  targetProducts: Product[];
  chosenProduct: Product | null;
}

/** Orders */
export interface OrdersPageState {
  pausedOrders: Order[];
  processOrders: Order[];
  finishedOrders: Order[];
}
