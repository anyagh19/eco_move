import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import productService from '../appwrite/Product'
import { Input, Button, Select } from '../Index'

function ShiftForm({ product }) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      userName: '',
      userPhone: '',
      userEmail: '',
      pickupAddress: '',
      dropAddress: '',
      shiftType: '',
      shiftVehicle: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const resetForm = () => {
    setValue('userName', '')
    setValue('userPhone', '')
    setValue('userEmail', '')
    setValue('pickupAddress', '')
    setValue('dropAddress', '')
    setValue('shiftType', '')
    setValue('shiftVehicle', '')
  }

  const submit = async (data) => {
    if (isSubmitting) return;
    setIsSubmitting(true)

    try {
      if (!userData) {
        toast.error('Login to proceed with shifting', { position: 'top-center' })
        return;
      }

      const dbProduct = await productService.addToShift(
        userData.$id,
        data.userName,
        data.userPhone.toString(),
        data.userEmail,
        data.pickupAddress,
        data.dropAddress,
        data.shiftType,
        data.shiftVehicle
      )

      if (dbProduct) {
        toast.success("🎉 Thanks for your shifting request!", { position: "top-center" });
        navigate(`/shift-page`);
        resetForm()
      }
    } catch (error) {
      console.error('Shift submission failed:', error)
      toast.error("Failed to process shift request. Try again.", { position: "top-center" });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className='w-full min-h-screen flex flex-col md:flex-row gap-6 p-8 bg-gray-50 rounded-lg shadow-md'>
      <div className='flex flex-col gap-6 w-full md:w-1/2'>
        <Input
          label='Name'
          type='text'
          placeholder='Enter Name'
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('userName', { required: true })}
        />
        <Input
          label='Phone'
          type='text'
          placeholder='Enter Phone'
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('userPhone', { required: true })}
        />
        <Input
          label='E-mail'
          type='email'
          placeholder='Enter Email'
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('userEmail', { required: true })}
        />
        <Select
          label='Shift Type'
          options={['Household', 'Office', 'Furniture', 'Appliance']}
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('shiftType', { required: true })}
        />
      </div>
      <div className='w-full md:w-1/2 flex flex-col gap-6'>
        <Select
          label='Shift Vehicle'
          options={['Mini Truck', 'Tempo', 'Lorry']}
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('shiftVehicle', { required: true })}
        />
        <Input
          label='Pickup Address'
          type='text'
          placeholder='Enter full address (House No, Street, City, State, Pincode)'
          className='border-gray-300 rounded-lg shadow-sm p-3 h-[150px]'
          {...register('pickupAddress', { required: true })}
        />
        <Input
          label='Drop Address'
          type='text'
          placeholder='Enter full address (House No, Street, City, State, Pincode)'
          className='border-gray-300 rounded-lg shadow-sm p-3 h-[150px]'
          {...register('dropAddress', { required: true })}
        />
        <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          {isSubmitting ? "Processing..." : "Shift Now"}
        </Button>
      </div>
    </form>
  )
}

export default ShiftForm;
