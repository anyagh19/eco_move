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
    const fetchUser = async () => {
        try {
            const user = await authService.getCurrentUser();
            if (user) {
                const role = localStorage.getItem("role") || "user";
                dispatch(login({ userData: user, role }));
            } else {
                dispatch(logout());
            }
        } catch (error) {
            console.error("Session fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchUser();
}, [dispatch]);


  // window.localStorage.clear()
  return !loading ?
    <div className='w-full min-h-screen '>
      <ToastContainer position="top-center" autoClose={3000} />
      <Header />
      
      <Outlet />
      <Footer />
    </div>
    : null
}

export default App
