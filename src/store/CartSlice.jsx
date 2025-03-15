import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk for removing a cart item
export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCartAsync",
  async (cartID, { rejectWithValue }) => {
    try {
      await productService.removeCartProduct(cartID);
      return cartID; // Return cartID so we can remove it from Redux store
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  //cartItems: JSON.parse(localStorage.getItem("cartData")) || [],
  cartItems: Array.isArray(JSON.parse(localStorage.getItem("cartData"))) 
    ? JSON.parse(localStorage.getItem("cartData")) 
    : [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { userID, productID, title, price, productImage } = action.payload;
      const existingItem = state.cartItems.find((item) => item.productID === productID);
      if (!existingItem) {
        state.cartItems.push({ userID, productID, title, price, productImage });
        localStorage.setItem("cartData", JSON.stringify(state.cartItems));
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.productID !== action.payload);
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
    },
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem("cartData");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(removeFromCartAsync.fulfilled, (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.productID !== action.payload);
      localStorage.setItem("cartData", JSON.stringify(state.cartItems));
    });
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
