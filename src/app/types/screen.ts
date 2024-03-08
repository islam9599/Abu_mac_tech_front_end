import { BoArticle } from "./boArticle";
import { Follower, Following } from "./follow";
import { Order } from "./order";
import { Product } from "./product";
import { Member, Shop } from "./user";

/** React app state */
export interface AppRootState {
  homePage: HomePageState;
  shopsPage: ShopPageState;
  ordersPage: OrdersPageState;
  communityPage: CommunityPageState;
  memberPage: MemberPageState;
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

/** Community */
export interface CommunityPageState {
  targetboArticles: BoArticle[];
}

export interface MemberPageState {
  chosenMember?: Member | null;
  chosenMemberBoArticles: BoArticle[];
  chosenSingleBoArticle?: BoArticle | null;
  memberFollowers: Follower[];
  memberFollowings: Following[];
}
