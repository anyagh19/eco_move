import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../appwrite/Product';

export const fetchWishlist = createAsyncThunk('wishlist/fetchWishlist', async (userID) => {
  const response = await productService.getWishlist(userID);
  return response;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: [],
  reducers: {
    addToWishlist: (state, action) => {
      state.push(action.payload);
    },
    removeFromWishlist: (state, action) => {
      return state.filter(item => item.$id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWishlist.fulfilled, (state, action) => {
      return action.payload;
    });
  }
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
