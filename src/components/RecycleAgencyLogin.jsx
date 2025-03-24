import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import recycleAuthService from '../appwrite/RecycleAuth'
import { login } from '../store/AuthSlice'
import { toast } from 'react-toastify'
import {Logo , Button , Input} from '../Index'
import { Link } from 'react-router-dom'

function RecycleAgencyLogin() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const{ register , handleSubmit} = useForm()
    const[error , setError] = useState('')
    const role = useSelector((state) => state.auth.role)

    const recycleAgencyLogin = async(data) => {
        setError('')
        try {
            const session = await recycleAuthService.recycleAgencyLogin(data)

            if(session){
                const recycleData = await recycleAuthService.getCurrentRecycleAgency()
                if(recycleData){
                    dispatch(login({userData : recycleData , role: 'recycle'}))
                    toast.success("🎉login successful" , {position: 'top-center'})
                }
            }
            navigate('/')
        } catch (error) {
            console.log('ra login form ' , error)
        }
    }

  return (
    <div className='w-full min-h-[89vh] bg-orange-100 flex justify-center items-center py-8'>
    <div className='flex flex-col  bg-white py-12 px-8 gap-6'>
        <div className='text-center'>
        <Logo />
        </div>
        <form onSubmit={handleSubmit(recycleAgencyLogin)} 
        className='flex flex-col gap-6'
        >
        <Input 
        type='email'
        placeholder='enter email'
        className='py-2 px-8 bg-white border'
        {...register('agencyEmail' , {
          required: true
        })}
        />
        <Input 
        type='password'
        placeholder='enter password'
        className='py-2 px-8 bg-white border'
        {...register('agencyPassword' , {
          required: true
        })}
        />
        <Link to='/recycle-signup' className='text-lg font-medium '>create an acount</Link>
        <Button 
        type='submit'
        className='bg-green-400 hover:bg-green-600 rounded-md text-lg font-medium '>Sign In</Button>
        
        </form>
    </div>
  </div>
  )
}

export default RecycleAgencyLogin