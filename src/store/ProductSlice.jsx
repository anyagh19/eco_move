// src/redux/slices/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import productService from '../appwrite/Product';

// Fetch All Products
export const fetchProducts = createAsyncThunk(
    'products/fetchAll',
    async (_, { rejectWithValue }) => {
        try {
            const response = await productService.listActiveProduct();
            return response.documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

// Fetch Products by Category
export const fetchProductsByCategory = createAsyncThunk(
    'products/fetchByCategory',
    async (category, { rejectWithValue }) => {
        try {
            const response = await productService.listProductByCategory(category);
            return response.documents;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const productSlice = createSlice({
    name: 'products',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducers: {
        clearProducts: (state) => {
            state.items = [];
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            })
            .addCase(fetchProductsByCategory.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProductsByCategory.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
});

export const { clearProducts } = productSlice.actions;
export default productSlice.reducer;
