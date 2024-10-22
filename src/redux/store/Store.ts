import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../slice/productSlice";
import wishlistReducer from "../slice/wishList";
import userReducer from "../slice/userSlice";

const store = configureStore({
  reducer: {
    product: productReducer,
    wishlist: wishlistReducer,
    userId : userReducer,
  },
});

export default store;