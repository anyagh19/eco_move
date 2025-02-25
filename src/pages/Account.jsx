import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Account() {
    return (
        <div className='flex gap-4'>
            <div className='w-[15%] px-10 py-10 flex flex-col bg-amber-200 gap-7'>

                <Link to='order'>
                    <button> order</button>
                </Link>
                <Link to='cart'>
                    <button>cart</button>
                </Link>
                <Link to='wishList'>
                    <button>Wishlist</button>
                </Link>

                <Link to='add-product'>
                    <button>add Product</button>
                </Link>
                <Link to='my-product'>
                    <button>My Product</button>
                </Link>

            </div>
            <Outlet />
        </div>
    )
}

export default Account