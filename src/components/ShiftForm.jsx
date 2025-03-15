import React from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import productService from '../appwrite/Product'
import { Input , Button , Select } from '../Index'

function ShiftForm({product}) {
  const { register, handleSubmit, setValue } = useForm({
    defaultValue: {
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
  //const [file, setFile] = useState(null)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()

  const resetForm = () => {
    setValue('userName', '')
    setValue('userPhone', '')
    setValue('userEmail', '')
    setValue('pickupAddress', '')
    setValue('dropAddress', '')
    setValue('shiftValue', '')
    setValue('shiftVehicle', '')
  }

  const submit = async (data) => {
    if (isSubmitting)
      return;
    setIsSubmitting(true)

    try {
      console.log('shift data', data)
      if (!userData) {
        console.log('login', error)
        toast.success('login to shift', { position: 'top-center' })
      }

      if (!product) {
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
          console.log('shift product', dbProduct);
          navigate(`/shift-page`);
          toast.success("🎉 Thanks for shifting request!", { position: "top-center" });
          resetForm()
        }
      }
    } catch (error) {
      console.log('f shift', error)
      throw error;
    }
  }
  return (
    <form onSubmit={handleSubmit(submit)} className='w-full min-h-screen flex gap-5 py-5 px-7'>
      <div className='flex flex-col gap-6 w-[50%]'>
        <Input
          label='Name'
          type='text'
          placeholder='enter Name'
          className='w-full border py-3 px-5  '
          {...register('userName', {
            required: true
          })}
        />
        <Input
          label='Phone'
          type='text'
          placeholder='enter Phone'
          className='w-full border py-3 px-5  '
          {...register('userPhone', {
            required: true
          })}
        />
        <Input
          label='E-mail'
          type='email'
          placeholder='enter Email'
          className='w-full border py-3 px-5  '
          {...register('userEmail', {
            required: true
          })}
        />

        <Select
          label='Shift Type'
          options={['household', 'office', 'furniture', 'appliannce']}
          className='w-full border py-3 px-5  '
          {...register('shiftType', {
            required: true
          })}
        />
      </div>
      <div className='w-[50%] flex flex-col gap-6'>
        <Select
          label='Shift Vehicle'
          options={['miniTruck', 'tempo', 'lorry']}
          className='w-full border py-3 px-5  '
          {...register('shiftVehicle', {
            required: true
          })}
        />
        <Input
          label='pick Address'
          type='text'
          placeholder='enter address(House No , building, Street Area - Town/Locality - City/District - State - Pincode)'
          className='border  px-10 py-3 w-full h-[200px]'
          {...register('pickupAddress', {
            required: true
          })}
        />
        <Input
          label='drop address'
          type='text'
          placeholder='enter address(House No , building, Street Area - Town/Locality - City/District - State - Pincode)'
          className='border  px-10 py-3 w-full h-[200px]'
          {...register('dropAddress', {
            required: true
          })}
        />
        <Button type="submit" disabled={isSubmitting} bgColor={product ? 'bg-green-300' : undefined} className="w-full bg-green-300">
          Shift
        </Button>
      </div>
    </form>
  )
}

export default ShiftForm