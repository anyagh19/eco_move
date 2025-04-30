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
import { AcceptedRecycleRequets, BuyPage, CartProducts, CategoryProduct, DeliveryRequetsPage, DonateForm, DonatePage, DonationRequetsPage, EditProduct, MyProduct, ProductForm, RecycleAgencyLogin,  RecycleAgencySignup, RecycleForm, RecyclePage, RecycleRequets, SellPage, ShiftForm, ShiftingAgencyLogin, ShiftingAgencySignup, ShiftingRequetsPage, ShiftPage, WishList , ShiftingAgencyPage, ShiftingDonationProducts, ShiftingDeliveryProducts, ShiftingShiftProducts, OrphanagesPage } from './Index.js'
import AllProducts from './pages/AllProducts.jsx'
import Home from './pages/Home.jsx'
import {ProductPage} from './Index.js'
import PaymentPage from './pages/Payment/PaymentPage.jsx'
import PaymentSummary from './pages/Payment/PaymentSummary.jsx'

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
        path: '/agency',
        element: <OrphanagesPage />
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
        path:'/recycle-signup',
        element: <RecycleAgencySignup />
      },
      {
        path:'/recycle-login',
        element: <RecycleAgencyLogin />
      },
      
      {
        path:'/recycle-requets',
        element: <RecycleRequets />
      },
      {
        path:'/accepted-recycle-requets',
        element: <AcceptedRecycleRequets />
      },
      {
        path:'/shifting-signup',
        element: <ShiftingAgencySignup />
      },
      {
        path:'/shifting-login',
        element: <ShiftingAgencyLogin />
      },
      {
        path:'/delivery-requets',
        element: <DeliveryRequetsPage />
      },
      {
        path:'/donation-requets',
        element: <DonationRequetsPage />
      },
      {
        path:'/shifting-requets',
        element: <ShiftingRequetsPage />
      },
      {
        path: '/payment',
        element: <PaymentPage />
      },
      {
        path: "/payment-success",
        element: <PaymentSummary />
      },
      {
        path:'/shifting-agency-page',
        element: <ShiftingAgencyPage />,
        children:[
          {
            path:'donation-products',
            element:<ShiftingDonationProducts />
          },
          {
            path:'delivery-products',
            element:<ShiftingDeliveryProducts />
          },
          {
            path:'shifting-products',
            element:<ShiftingShiftProducts />
          }
        ]
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
