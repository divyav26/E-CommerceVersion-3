
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
  filteredProducts: Product[];
  searchText: string;
  selectedCategory: string;
 
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  searchText: '',
  selectedCategory: '',
 
};

export const productSlice =  createSlice({
  name: "product",
  initialState,
  reducers: {
   setProducts:(state, action:PayloadAction<Product[]>) => {
      state.products = action.payload;
      //initially all product are filter it show all product
      state.filteredProducts =action.payload
    },

    filterByCategory: (state,action:PayloadAction<string>)=>{
      state.selectedCategory = action.payload;
      if(action.payload ==="all"){
        //show all products when all is selected
        state.filteredProducts = state.products
      }
      else{
        state.filteredProducts = state.products.filter(product=>
          product.category?.toLowerCase() === action.payload.toLowerCase()
        )
      }
    },

    //search product
    SearchProduct: (state,action:PayloadAction<string>)=>{
      state.searchText = action.payload;
      if(action.payload ===""){
        //show all products when search text is empty
        state.filteredProducts = state.products
      }
      else{
        state.filteredProducts = state.products.filter(product=>
          product.name?.toLowerCase().includes(action.payload.toLowerCase())
        )
      }
    },

    clearFilter: (state)=>{
      state.searchText = '';
      state.selectedCategory = '';
      state.filteredProducts = state.products;
    },
  },
});

export const { setProducts ,filterByCategory,SearchProduct,clearFilter } = productSlice.actions;

export default productSlice.reducer;