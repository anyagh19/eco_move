import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'

function SellPage() {
  return (
    <div className=' flex flex-col gap-8 items-center justify-center min-h-screen text-7xl text-center font-bold bg-center bg-no-repeat bg-[url("https://th.bing.com/th?id=OIP.CcVUs8msgsGkUKQPmxkc6AHaHa&w=250&h=250&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2")]'>
      Welcome to Ecomove, a platform where u can sell ur second hand products at best price 
      <Link to='/user-page/add-product'>
       <Button
        className='bg-green-400 text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600'
       >
        Sell Product
       </Button>
      </Link>
    </div>
  )
}

export default SellPage