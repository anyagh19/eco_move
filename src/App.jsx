import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite/Auth'
import { login, logout } from './store/AuthSlice'
import { Footer, Header } from './Index'
import { Link, Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import { MessageSquareText } from 'lucide-react';
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
        <div className='w-full min-h-screen relative'>
            <ToastContainer position="top-center" autoClose={3000} />
            <a
                href="https://wa.me/+919699381805" // Replace with your number
                target="_blank"
                rel="noopener noreferrer"
                className='fixed bg-gray-300 p-2 text-green-400 ml-[93%] mt-[80%] md:ml-[97%] text-4xl md:mt-[30%]'
                title="Chat with us on WhatsApp"
            >
                <MessageSquareText className='text-4xl cursor-pointer hover:scale-110 transition-transform' />
            </a>

            <Header />

            <Outlet />
            <Footer />
        </div>
        : null
}

export default App
