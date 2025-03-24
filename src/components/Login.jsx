import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import authService from '../appwrite/Auth'
import { login as storelogin, logout } from '../store/AuthSlice'
import { Button, Input, Logo } from '../Index'
import { toast } from 'react-toastify'


function Login() {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()
  const role = useSelector((state) => state.auth.role)

  const loginUser = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      console.log('Session:', session)
      if (session) {
        const userData = await authService.getCurrentUser()
        console.log('User Data:', userData)
        if (userData) {
          dispatch(storelogin({ userData: userData, role: 'user' }))
          toast.success("🎉login successful", { position: 'top-center' })
        }
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='w-full min-h-[89vh] bg-orange-100 flex justify-center items-center py-8'>
      <div className='flex flex-col  bg-white py-12 px-8 gap-6'>
        <div className='text-center'>
          <Logo />
        </div>
        <form onSubmit={handleSubmit(loginUser)}
          className='flex flex-col gap-6'
        >
          <Input
            type='email'
            placeholder='enter email'
            className='py-2 px-8 bg-white border'
            {...register('email', {
              required: true
            })}
          />
          <Input
            type='password'
            placeholder='enter password'
            className='py-2 px-8 bg-white border'
            {...register('password', {
              required: true
            })}
          />
          <Link to='/signup' className='text-lg font-medium hover:text-green-400'>create an acount</Link>
          <Button
            type='submit'
            className='bg-green-400 hover:bg-green-600 rounded-md text-lg font-medium'>Sign In</Button>
          <div className=' flex justify-between px-5'>
            <Link to='/recycle-signup' className='text-xl font-semibold bg-green-400 py-3 px-6 rounded-xl'>recycle</Link>
            <Link to='/shifting-signup' className='text-xl font-semibold bg-yellow-400 py-3 px-6 rounded-xl'>shift</Link>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login