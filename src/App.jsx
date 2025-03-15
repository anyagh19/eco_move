import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth'
import { login, logout } from './store/AuthSlice'
import { Footer, Header } from './Index'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        }
        else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [])

  // window.localStorage.clear()
  return !loading ?
    <div className='w-full min-h-screen '>
      <ToastContainer position="top-center" autoClose={3000} />
      <Header />
      {/* <div className='w-full flex items-center justify-between py-2 px-6'>
        <Link to='/'>
          <h3 className='font-semibold text-gray-600 hover:text-gray-800 text-lg'>Buy</h3>
        </Link>
        <Link to='/sell-page'>
          <h3 className='font-semibold text-gray-600 hover:text-gray-800 text-lg'>Sell</h3>
        </Link>
        <Link to='/donate-page'>
          <h3 className='font-semibold text-gray-600 hover:text-gray-800 text-lg'>Donate</h3>
        </Link>
        <Link to='/recycle-page'>
        <h3 className='font-semibold text-gray-600 hover:text-gray-800 text-lg'>Recycle</h3>
        </Link>
        <h3 className='font-semibold text-gray-600 hover:text-gray-800 text-lg'>Shift</h3>
      </div> */}
      <Outlet />
      <Footer />
    </div>
    : null
}

export default App
