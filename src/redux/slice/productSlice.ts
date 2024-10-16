
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    quantity?: number;
    category?: string;
    brand?: string;
    discount?: number;
    finalprice?: number;
    stock?: number;
  }
interface ProductState {
  products: Product[];
 
}

const initialState: ProductState = {
  products: []
 
};

export const productSlice =  createSlice({
  name: "product",
  initialState,
  reducers: {
   setProducts:(state, action:PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
   
  },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;