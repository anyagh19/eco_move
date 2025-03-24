import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import recycleAuthService from '../appwrite/RecycleAuth'
import { toast } from 'react-toastify'
import { Button, Input, Logo } from '../Index'
import { useDispatch } from 'react-redux'
import { login } from '../store/AuthSlice'

function RecycleAgencySignup() {
    const { register, handleSubmit, setValue } = useForm({
        defaultValues: {
            agencyName: '',
            agencyEmail: '',
            agencyPassword: '',
            agencyPhone: '',
            agencyAddress: '',
            agencyCity: '',
            serviceArea: '',
            acceptedMaterials: '',
        }
    })
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false)

    const recycleSignup = async (data) => {
        setError('')
        try {
            if (isSubmitting)
                return;
            setIsSubmitting(true)
            if (data.agencyPassword.length < 8) {
                toast.error("Password must be at least 8 characters long.", { position: "top-center" });
                return;
            }

            const agency = await recycleAuthService.createRecycleAgency(data)
            if (agency) {
                toast.success("🎉 Agency registered successfully!", { position: "top-center" });
                const currentData = await recycleAuthService.getCurrentRecycleAgency()
                if (currentData)
                    dispatch(login({ userData: currentData, role: data.role || "recycle"  }))
                navigate('/')

            }
        } catch (error) {
            console.log('form r a ', error)
            throw error
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
                <form onSubmit={handleSubmit(recycleSignup)} className='flex flex-col gap-6'>
                    <Input
                        label='Name:'
                        type='text'
                        placeholder='enter name'
                        className='py-2 px-16 bg-white border'
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
                        placeholder='enter Phone'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyPhone', {
                            required: true
                        })}
                    />
                    <Input
                        label='Address:'
                        type='text'
                        placeholder='enter Address'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyAddress', {
                            required: true
                        })}
                    />
                    <Input
                        label='City:'
                        type='text'
                        placeholder='enter city'
                        className='py-2 px-12 bg-white border'
                        {...register('agencyCity', {
                            required: true
                        })}
                    />
                    <Input
                        label='Service Area:'
                        type='text'
                        placeholder='enter area of service'
                        className='py-2 px-12 bg-white border'
                        {...register('serviceArea', {
                            required: true
                        })}
                    />
                    <Input
                        label='Material:'
                        type='text'
                        placeholder='enter name'
                        className='py-2 px-12 bg-white border'
                        {...register('acceptedMaterials', {
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
                    to='/recycle-login'
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

export default RecycleAgencySignup