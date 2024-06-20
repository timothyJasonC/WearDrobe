import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, combineSlices, configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./features/cart/cartSlice";
import { auth } from "@/firebase/config";
import { warehouseSlice } from "./features/warehouse/warehouseSlice";

const rootReducer = combineReducers({
  cart: cartSlice.reducer,
  warehouse: warehouseSlice.reducer
})
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
