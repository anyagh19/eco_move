import React, { useState } from 'react'
import { Logo, Input, Button } from '../Index'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/Auth'
import { login } from '../store/AuthSlice'

function Signup() {
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError('')
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUserData = await authService.getCurrentUser(userData)

        dispatch(login({ userData: currentUserData, role: data.role || "user"  }));
        navigate('/')
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className='w-full min-h-[89vh] bg-orange-50 flex justify-center items-center py-8 overflow-y-auto-auto'>
      <div className='flex flex-col  bg-white py-5 px-16 gap-6'>
        <div className='text-center'>
          <Logo />
        </div>
        <form onSubmit={handleSubmit(create)} className='flex flex-col gap-6'>
          <Input
            type='email'
            placeholder='enter email'
            className='py-2 px-12 bg-white border'
            {...register('email', {
              required: true
            })}
          />
          <Input
            type='password'
            placeholder='enter password'
            className='py-2 px-12 bg-white border'
            {...register('password', {
              required: true
            })}
          />
          <Input
            type='text'
            placeholder='enter name'
            className='py-2 px-12 bg-white border'
            {...register('name', {
              required: true
            })}
          />
          <Input
            type='phone'
            placeholder='enter phoneNumber'
            className='py-2 px-12 bg-white border'
            {...register('phoneNumber', {
              required: true
            })}
          />
          {/* <Input 
          type='text'
          placeholder='enter role'
          className='py-2 px-12 bg-white border'
          {...register('role' , {
            required: true
          })}
          /> */}
          <Input
            type="text"
            placeholder="Enter role"
            className="py-2 px-12 bg-white border"
            {...register("role", { required: true })}
          />

          <Link to='/login' className='hover:text-blue-300 text-lg font-medium'>Already have an account</Link>
          <Button
            type='submit'
            className='bg-green-400 hover:bg-green-600 rounded-md text-lg font-medium'>Sign Up</Button>
        </form>
      </div>
    </div>
  )
}

export default Signup