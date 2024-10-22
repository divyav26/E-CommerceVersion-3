import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface wishlits{
    id: string;
    name: string;
    price: number;
    images: string[];
    description: string;
    quantity?: number;
    category?: string;
    brand?: string;
    discount?: number;
    finalprice?: number
}

interface wishlistState{
  items: wishlits[];
}

const initialState: wishlistState = {
  items: [],
};
export const wishlistSlice =  createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishList:(state, action:PayloadAction<wishlits>) => {
        const item = action.payload;
        const existingItem = state.items.find(item => item.id === item.id)
        // if product not exist in wishlist add it
        if (!existingItem) {
            state.items.push(item)
        }
    },

    // remove product from wishlist
    removeFromWishList:(state, action:PayloadAction<string>) => {
        const itemId = action.payload;
        state.items = state.items.filter((item)=>item.id !== itemId)
    },

    clearWishList:(state) => {
        state.items = []
    },

  }
})
export const { addToWishList,removeFromWishList,clearWishList } = wishlistSlice.actions;
export default wishlistSlice.reducer;