import {configureStore} from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import productSlice from'./ProductSlice'
import wishlistSlice from './WishlistSlice'

const store = configureStore({
    reducer:{
        auth: authSlice,
        products: productSlice,
        WishList: wishlistSlice
    }
})

export default store;