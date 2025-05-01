import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import productService from '../appwrite/Product'
import { Input, Button, Select } from '../Index'

const itemOptions = {
  household: ['Electronics', 'Furniture', 'Kitchenware', 'Books'],
  office: ['Desks', 'Chairs', 'Computers'],
  furniture: ['Sofa', 'Bed', 'Wardrobe'],
  appliance: ['Washing Machine', 'Fridge', 'Microwave']
}

function ShiftForm({ product }) {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      userName: '',
      userPhone: '',
      userEmail: '',
      pickupAddress: '',
      dropAddress: '',
      shiftType: '',
      shiftVehicle: '',
      shiftItems: '',
      houseType: ''
    }
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const selectedShiftType = watch('shiftType')

  const resetForm = () => {
    const fields = [
      'userName', 'userPhone', 'userEmail', 'pickupAddress',
      'dropAddress', 'shiftType', 'shiftVehicle', 'shiftItems', 'houseType'
    ]
    fields.forEach(field => setValue(field, field === 'shiftItems' ? [] : ''))
  }

  const submit = async (data) => {
    if (isSubmitting) return
    setIsSubmitting(true)

    try {
      if (!userData) {
        toast.error('Login to proceed with shifting', { position: 'top-center' })
        return
      }

      const dbProduct = await productService.addToShift(
        userData.$id,
        data.userName,
        data.userPhone.toString(),
        data.userEmail,
        data.pickupAddress,
        data.dropAddress,
        data.shiftType,
        data.shiftVehicle,
        data.shiftItems.toString(),
        data.houseType
      )

      if (dbProduct) {
        toast.success("🎉 Thanks for your shifting request!", { position: "top-center" })
        navigate(`/shift-page`)
        resetForm()
      }
    } catch (error) {
      console.error('Shift submission failed:', error)
      toast.error("Failed to process shift request. Try again.", { position: "top-center" })
    } finally {
      setIsSubmitting(false)
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
          {...register('userName', {
            required: 'Name is required',
            validate: value =>
              /^[A-Za-z\s]+$/.test(value) || 'Name should only contain letters'
          })}
        />
        {errors.userName && <span className='text-red-500 text-sm'>{errors.userName.message}</span>}

        <Input
          label='Phone'
          type='text'
          placeholder='Enter Phone'
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('userPhone', {
            required: 'Phone number is required',
            validate: value =>
              /^[0-9]+$/.test(value) || 'Phone should only contain numbers'
          })}
        />
        {errors.userPhone && <span className='text-red-500 text-sm'>{errors.userPhone.message}</span>}

        <Input
          label='E-mail'
          type='email'
          placeholder='Enter Email'
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('userEmail', { required: 'Email is required' })}
        />
        {errors.userEmail && <span className='text-red-500 text-sm'>{errors.userEmail.message}</span>}

        <Select
          label='Shift Type'
          options={['household', 'office', 'furniture', 'appliance']}
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('shiftType', { required: 'Shift type is required' })}
        />
        {errors.shiftType && <span className='text-red-500 text-sm'>{errors.shiftType.message}</span>}

        {selectedShiftType && (
          <Controller
            name="shiftItems"
            control={control}
            defaultValue={[]}
            rules={{ required: 'Please select at least one item' }}
            render={({ field }) => (
              <div className='flex flex-col'>
                <label className='mb-1 font-medium text-gray-700'>Select Items</label>
                <select
                  multiple
                  className='border-gray-300 rounded-lg shadow-sm p-3 h-32'
                  value={field.value || []}
                  onChange={(e) => {
                    const selectedValues = Array.from(e.target.selectedOptions, (option) => option.value)
                    field.onChange(selectedValues)
                  }}
                >
                  {(itemOptions[selectedShiftType] || []).map((item, index) => (
                    <option key={index} value={item}>{item}</option>
                  ))}
                </select>
                {errors.shiftItems && <span className='text-red-500 text-sm'>{errors.shiftItems.message}</span>}
              </div>
            )}
          />
        )}

        {selectedShiftType === 'household' && (
          <Select
            label='House Type'
            options={['1 BHK', '2 BHK', '3 BHK', 'Villa']}
            className='w-full border-gray-300 rounded-lg shadow-sm p-3'
            {...register('houseType', { required: 'Please select house type' })}
          />
        )}
        {selectedShiftType === 'household' && errors.houseType && (
          <span className='text-red-500 text-sm'>{errors.houseType.message}</span>
        )}
      </div>

      <div className='w-full md:w-1/2 flex flex-col gap-6'>
        <Select
          label='Shift Vehicle'
          options={['miniTruck', 'tempo', 'lorry']}
          className='w-full border-gray-300 rounded-lg shadow-sm p-3'
          {...register('shiftVehicle', { required: 'Please select a vehicle' })}
        />
        {errors.shiftVehicle && <span className='text-red-500 text-sm'>{errors.shiftVehicle.message}</span>}

        <Input
          label='Pickup Address'
          type='text'
          placeholder='Enter full address (House No, Street, City, State, Pincode)'
          className='border-gray-300 rounded-lg shadow-sm p-3 h-[150px]'
          {...register('pickupAddress', { required: 'Pickup address is required' })}
        />
        {errors.pickupAddress && <span className='text-red-500 text-sm'>{errors.pickupAddress.message}</span>}

        <Input
          label='Drop Address'
          type='text'
          placeholder='Enter full address (House No, Street, City, State, Pincode)'
          className='border-gray-300 rounded-lg shadow-sm p-3 h-[150px]'
          {...register('dropAddress', { required: 'Drop address is required' })}
        />
        {errors.dropAddress && <span className='text-red-500 text-sm'>{errors.dropAddress.message}</span>}

        <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition">
          {isSubmitting ? "Processing..." : "Shift Now"}
        </Button>
      </div>
    </form>
  )
}

export default ShiftForm
