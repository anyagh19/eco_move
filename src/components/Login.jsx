import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import {useForm} from 'react-hook-form'
import authService from '../appwrite/Auth'
import { login as storelogin, logout } from '../store/AuthSlice'
import {Button, Input, Logo} from '../Index'

function Login() {
  const[error , setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const{ register , handleSubmit} = useForm()

  const loginUser = async(data) => {
    setError("")
    try {
      const session = await authService.login(data)
      console.log('Session:', session)
      if (session) {
        const userData = await authService.getCurrentUser()
        console.log('User Data:', userData)
        if(userData){
          dispatch(storelogin(userData))
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
          {...register('email' , {
            required: true
          })}
          />
          <Input 
          type='password'
          placeholder='enter password'
          className='py-2 px-8 bg-white border'
          {...register('password' , {
            required: true
          })}
          />
          <Link to='/signup'>create an acount</Link>
          <Button 
          type='submit'
          className='bg-green-400 hover:bg-green-600 rounded-md'>Sign In</Button>
          </form>
      </div>
    </div>
  )
}

export default Login