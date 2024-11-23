import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth_slice";
import adminProductsSlice from "./admin/products_slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProduct: adminProductsSlice,
  },
});
export default store;
