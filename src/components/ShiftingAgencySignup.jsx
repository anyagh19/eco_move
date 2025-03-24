import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import shiftAuthService from '../appwrite/ShiftAuthService'
import { login } from '../store/AuthSlice'
import {Logo , Input , Button} from '../Index'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

function ShiftingAgencySignup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const[isSubmitting , setIsSubmitting] = useState(false)
    const[error , setError] = useState('')
    const{register , handleSubmit , setValue} = useForm({
        defaultValues:{
            agencyName: '',
            agencyEmail: '',
            agencyPassword: '',
            agencyPhone: '',
            agencyAddress: '',
            agencyCity: '',
            serviceArea: '',
            vehicleAvailable: ''
        }
    })

    const shiftCreate = async(data) => {
        setError('')
        try {
            if(isSubmitting)
                return;
            setIsSubmitting(true)

            const agency = await shiftAuthService.createShiftingAgency(data)
            if(agency){
                 toast.success("🎉 Agency registered successfully!", { position: "top-center" });
                 const userData = await shiftAuthService.getCurrentShiftingAgency()
                 if(userData){
                    dispatch(login({userData: userData , role: data.role || 'shift'}))
                 }
                 navigate('/')
            }
        } catch (error) {
            console.log('shift form ', error)
            throw error;
        }
        finally {
            setIsSubmitting(false);
        }
    }
  return (
    <div className='w-full min-h-[89vh] bg-orange-50 flex justify-center items-center py-8 overflow-y-auto-auto'>
            <div className='flex flex-col  bg-white py-5 px-16 gap-6'>
                <div className='text-center'>
                    <Logo />
                </div>
                <form onSubmit={handleSubmit(shiftCreate)} className='flex flex-col gap-6'>
                    <Input
                        label='Name:'
                        type='text'
                        placeholder='enter name'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyName', {
                            required: true
                        })}
                    />
                    <Input
                        label='Email:'
                        type='email'
                        placeholder='enter email'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyEmail', {
                            required: true
                        })}
                    />
                    <Input
                    label='Password:'
                        type='password'
                        placeholder='enter password'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyPassword', {
                            required: true
                        })}
                    />
                    <Input
                        label='Phone:'
                        type='text'
                        placeholder='enter name'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyPhone', {
                            required: true
                        })}
                    />
                    <Input
                        label='Address:'
                        type='text'
                        placeholder='enter address'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyAddress', {
                            required: true
                        })}
                    />
                    {/* <Input
                        label='City'
                        type='text'
                        placeholder='enter city'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyCity', {
                            required: true
                        })}
                    /> */}
                    <Input
                        label='Service Area:'
                        type='text'
                        placeholder='enter area'
                        className='py-2 px-12 bg-white border'
                        {...register('serviceArea', {
                            required: true
                        })}
                    />
                    <Input
                        label='Vehicles:'
                        type='text'
                        placeholder='enter vehicle u have'
                        className='py-2 px-12 bg-white border'
                        {...register('vehicleAvailable', {
                            required: true
                        })}
                    />
                    <Input
                    label='Role:'
                        type="text"
                        placeholder="Enter role"
                        className="py-2 px-12 bg-white border"
                        {...register("role", { required: true })}
                    />
                    <Link
                    to='/shifting-login'
                    className='text-lg font-medium '
                    >
                        Already register agency
                    </Link>
                    <Button
                        type='submit'
                        className='bg-green-400 hover:bg-green-600 rounded-md text-lg font-medium '>Create Agency</Button>
                </form>
            </div>
        </div>
  )
}

export default ShiftingAgencySignup