import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ReduxLogger from "redux-logger";
import HomePageReducer from "./screens/Homepage/slice";
import ShopPageReducer from "./screens/ShopsPage/slice";
import OrdersPageReducer from "./screens/OrdersPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    /*@ts-ignore */
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopsPage: ShopPageReducer,
    ordersPage: OrdersPageReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
