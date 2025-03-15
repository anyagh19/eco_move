import React,  { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/Store.js'
import { createBrowserRouter, RouterProvider,  } from 'react-router-dom'
import Login from './components/Login.jsx'
import Signup from './components/Signup.jsx'
import Account from './pages/Account.jsx'
import Orders from './pages/Orders.jsx'
import { BuyPage, CartProducts, CategoryProduct, DonateForm, DonatePage, EditProduct, MyProduct, ProductForm, RecycleForm, RecyclePage, SellPage, ShiftForm, ShiftPage, WishList } from './Index.js'
import AllProducts from './pages/AllProducts.jsx'
import Home from './pages/Home.jsx'
import {ProductPage} from './Index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      // {
      //   path: '/',
      //   element: <AllProducts />
      // },
      {
        path:'/',
        element: <Home />
      },
      {
        path:'/buy-page',
        element: <BuyPage />
      },
      {
        path: '/category/:category',
        element: <CategoryProduct />
      },
      {
        path:'/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: '/product/:id',  // ✅ Dynamic route for individual products
        element: <ProductPage />
      },
      {
        path: '/edit-product/:id',
        element: <EditProduct />
      },
      {
        path:'/sell-page',
        element: <SellPage />
      },
      {
        path:'/donate-page',
        element: <DonatePage />
      },
      {
        path:'/donate-form',
        element: <DonateForm />
      },
      {
        path:'/recycle-page',
        element: <RecyclePage />
      },
      {
        path:'/recycle-form',
        element: <RecycleForm />
      },
      {
        path:'/shift-page',
        element: <ShiftPage />
      },
      {
        path:'/shift-form',
        element: <ShiftForm />
      },
      {
        path:'/user-page',
        element: <Account />,
        children: [
          {
            path:'order',
            element: <Orders />
          },
          {
            path: 'cart',
            element: <CartProducts />
          },
          {
            path: 'add-product',
            element: <ProductForm />
          },
          {
            path:'my-product',
            element: <MyProduct />
          },
          {
            path: 'wishlist',
            element:<WishList />
          }
        ]
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
     <RouterProvider router={router} />
    </Provider>
    
  </StrictMode>,
)
