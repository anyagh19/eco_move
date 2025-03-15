import {configureStore} from '@reduxjs/toolkit'
import authSlice from './AuthSlice'
import productSlice from'./ProductSlice'
import wishlistSlice from './WishlistSlice'
import cartSlice from './CartSlice'
import { thunk } from 'redux-thunk'

const store = configureStore({
    reducer:{
        auth: authSlice,
        products: productSlice,
        WishList: wishlistSlice,
        cart: cartSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store;