import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../Index'

function DonatePage() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen gap-16 '>
            <h1 className='text-4xl text-center font-bold'>Do you have household items or furniture that you no longer need? Instead of letting them go to waste, donate them to someone who can use them!</h1>
            <h1 className='text-5xl text-center font-bold'>"परहिताय यो दत्तं स दानं परमं स्मृतम्।" 🌿✨</h1>
            <h2 className='text-3xl text-center font-semibold'>At EcoMove, we connect generous donors like you with NGOs, recycling centers, and individuals in need. Your donation can make a real difference in someone’s life.</h2>
            <Link to='/donate-form'>
                <Button
                    className='bg-green-400 text-3xl font-semibold py-4 px-10 rounded-full hover:bg-green-600'
                >
                    Donate Product
                </Button>
            </Link>
        </div>
    )
}

export default DonatePage