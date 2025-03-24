import React from 'react'
import { Link , Outlet } from 'react-router-dom'

function ShiftingAgencyPage() {
  return (
    <div className='flex gap-5'>
      <div className='w-[21%] px-10 py-10 flex flex-col items-start  gap-7 min-h-[88vh] shadow-lg hover:shadow-xl   '>
          <Link
          to='delivery-products'
          className='text-lg font-medium'
          >
          My Deliverys
          </Link>
          <Link
          to='donation-products'
          className='text-lg font-medium'
          >
            Donations Orders
          </Link>
          <Link
          to='shifting-products'
          className='text-lg font-medium'
          >
           Shift Order
          </Link>
      </div>
      <div className="relative w-full">
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

export default ShiftingAgencyPage;