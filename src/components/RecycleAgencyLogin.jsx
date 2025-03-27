import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import recycleAuthService from '../appwrite/RecycleAuth'
import { login } from '../store/AuthSlice'
import { toast } from 'react-toastify'
import { Logo, Button, Input } from '../Index'

function RecycleAgencyLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState('')
    const role = useSelector((state) => state.auth.role)

    const recycleAgencyLogin = async (data) => {
        setError('')
        try {
            const session = await recycleAuthService.recycleAgencyLogin(data)

            if (session) {
                const recycleData = await recycleAuthService.getCurrentRecycleAgency()
                if (recycleData) {
                    dispatch(login({ userData: recycleData, role: 'recycle' }))
                    toast.success("🎉 Login successful!", { position: 'top-center' })
                    navigate('/')
                }
            }
        } catch (err) {
            console.error('Recycle Agency Login Error:', err)
            setError('Invalid email or password. Please try again.')
        }
    }

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center py-10">
            <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md">
                <div className="text-center">
                    <Logo />
                    <h2 className="text-2xl font-semibold text-gray-800 mt-4">Recycle Agency Login</h2>
                </div>

                {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                <form onSubmit={handleSubmit(recycleAgencyLogin)} className="flex flex-col gap-5 mt-6">
                    <Input
                        type="email"
                        placeholder="Enter email"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyEmail', { required: true })}
                    />
                    <Input
                        type="password"
                        placeholder="Enter password"
                        className="w-full p-3 border rounded-md focus:ring-2 focus:ring-green-500"
                        {...register('agencyPassword', { required: true })}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-md text-lg font-medium transition duration-300"
                    >
                        Sign In
                    </Button>
                </form>

                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <Link to="/recycle-signup" className="text-green-600 hover:underline font-medium">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RecycleAgencyLogin
