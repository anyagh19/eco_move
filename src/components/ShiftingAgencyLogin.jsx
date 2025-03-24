import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import shiftAuthService from '../appwrite/ShiftAuthService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../store/AuthSlice'
import {Logo , Button , Input} from '../Index'
import { Link } from 'react-router-dom'

function ShiftingAgencyLogin() {
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const agencyLogin = async (data) => {
        setError('')
        try {
            const shiftAgency = await shiftAuthService.shiftingAgencyLogin(data)
            if (shiftAgency) {
                const userData = await shiftAuthService.getCurrentShiftingAgency()
                if (userData) {
                    dispatch(login({ userData: userData, role: 'shift' }))
                    toast.success('successfully logged in', { position: 'top-center' })
                    navigate('/')
                }

            }
        } catch (error) {
            console.log(' s a log ', error)
        }
    }
    return (
        <div className='w-full min-h-[89vh] bg-orange-100 flex justify-center items-center py-8'>
            <div className='flex flex-col  bg-white py-12 px-8 gap-6'>
                <div className='text-center'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(agencyLogin)}
                    className='flex flex-col gap-6'
                >
                    <Input
                        type='email'
                        placeholder='enter email'
                        className='py-2 px-8 bg-white border'
                        {...register('agencyEmail', {
                            required: true
                        })}
                    />
                    <Input
                        type='password'
                        placeholder='enter password'
                        className='py-2 px-8 bg-white border'
                        {...register('agencyPassword', {
                            required: true
                        })}
                    />
                    <Link to='/shifting-signup' className='text-lg font-medium '>create an acount</Link>
                    <Button
                        type='submit'
                        className='bg-green-400 hover:bg-green-600 rounded-md text-lg font-medium '>Sign In</Button>

                </form>
            </div>
        </div>
    )
}

export default ShiftingAgencyLogin