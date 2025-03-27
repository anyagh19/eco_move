import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'

function RecyclePage() {
    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-10 bg-center bg-no-repeat bg-[url("https://th.bing.com/th?id=OIP.ajEWaL9mTXt_gzJMkphe-wHaHR&w=252&h=247&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2")] '>
            <h1 className='text-7xl font-bold text-center'>♻ Recycle with Ecomove – Give Your Old Items a New Life!</h1>

            <p className='text-2xl  max-w-screen-md'>
                    Reduce waste, earn rewards, and help the environment by recycling your old items. Schedule a pickup and let Ecomove take care of the rest!
                </p>
            <Link to='/recycle-form'>
                <Button
                    className='bg-green-400 text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600'
                >
                    Recycle Product
                </Button>
            </Link>
        </div>
    )
}

export default RecyclePage