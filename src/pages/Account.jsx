import React from 'react'
import { useSelector } from 'react-redux'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { Book, Heart, PackagePlus, ShoppingCart } from 'lucide-react'
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import VolunteerActivismOutlinedIcon from '@mui/icons-material/VolunteerActivismOutlined';
import RecyclingOutlinedIcon from '@mui/icons-material/RecyclingOutlined';

function Account() {
    const userData = useSelector((state) => state.auth.userData)
    const location = useLocation()
    return (
        <div className='flex gap-4'>
            <div className='w-[19%] px-10 py-10 flex flex-col items-start  gap-7 min-h-[88vh] shadow-lg hover:shadow-xl   '>

                <Link to='order' className='flex items-center'>
                    <Book />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'> Order</button>
                </Link>
                <Link to='cart' className='flex items-center'>
                    <ShoppingCart />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>Cart</button>
                </Link>
                <Link to='wishList' className='flex items-center'>
                    <Heart />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>Wishlist</button>
                </Link>

                <Link to='add-product' className='flex items-center'>
                <PackagePlus />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>Add Product</button>
                </Link>
                <Link to='my-product' className='flex items-center'>
                <StorefrontOutlinedIcon />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>My Product</button>
                </Link>
                <Link to='donation' className='flex items-center'>
                    <VolunteerActivismOutlinedIcon />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>Donation</button>
                </Link>
                <Link to='recycle' className='flex items-center'>
                    <RecyclingOutlinedIcon />
                    <button className='w-full text-lg font-semibold text-gray-500 hover:text-gray-700'>Recycle</button>
                </Link>
            </div>

            <div className="relative w-full">
                {/* Renders Outlet if there's a matching nested route, otherwise shows Welcome message */}
                {location.pathname === "/user-page" ? (
                    <h1 className="text-7xl font-bold absolute inset-0 m-auto w-fit h-fit">
                        Welcome! {userData?.name}
                    </h1>
                ) : (
                    <Outlet />
                )}
            </div>
        </div>
    )
}

export default Account