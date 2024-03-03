import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import ReduxLogger from "redux-logger";
import HomePageReducer from "./screens/Homepage/slice";
import ShopPageReducer from "./screens/ShopsPage/slice";

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    /*@ts-ignore */
    getDefaultMiddleware().concat(ReduxLogger),
  reducer: {
    homePage: HomePageReducer,
    shopPage: ShopPageReducer,
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
