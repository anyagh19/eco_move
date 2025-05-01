import { Input, Button, Select } from '../Index'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import productService from '../appwrite/Product'

function RecycleForm({ product }) {
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({
        defaultValues: {
            title: '',
            category: '',
            weight: '',
            productImage: '',
            pickupAddress: ''
        }
    })

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [file, setFile] = useState(null)
    const userData = useSelector((state) => state.auth.userData)
    const navigate = useNavigate()

    const resetForm = () => {
        setValue('title', '')
        setValue('category', '')
        setValue('weight', '')
        setFile(null)
        setValue('pickupAddress', '')
    }

    const submit = async (data) => {
        if (isSubmitting) return;
        setIsSubmitting(true)

        try {
            if (!userData) {
                toast.error('Login to Recycle', { position: 'top-center' })
                return;
            }

            let recycleFileID = null;
            if (file) {
                const uploadFile = await productService.uploadProductFile(file, userData.$id)
                recycleFileID = uploadFile.$id;
            }

            const weight = parseInt(data.weight, 10);
            if (isNaN(weight)) {
                toast.error("Weight must be a valid number!", { position: "top-center" });
                return;
            }

            if (!product) {
                const dbProduct = await productService.addToRecycle(
                    userData.$id,
                    data.title,
                    data.category,
                    recycleFileID,
                    weight,
                    data.pickupAddress
                );

                if (dbProduct) {
                    toast.success("🎉 Thanks for Recycling!", { position: "top-center" });
                    navigate(`/recycle-page`);
                    resetForm();
                }
            }
        } catch (error) {
            console.error('Submit recycle error:', error);
            toast.error("Failed to recycle. Try again.", { position: "top-center" });
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={handleSubmit(submit)} className='w-full min-h-screen flex flex-col md:flex-row gap-6 p-8 bg-gray-50 rounded-lg shadow-md'>
            <div className='flex flex-col gap-6 w-full md:w-1/2'>
                <Input
                    label='Title:'
                    type='text'
                    placeholder='Enter title'
                    className='w-full border-gray-300 rounded-lg shadow-sm p-3'
                    {...register('title', { required: "Title is required" })}
                />
                {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}

                <Select
                    label='Category'
                    options={['paper', 'cardboard', 'metal', 'other']}
                    className='w-full border-gray-300 rounded-lg shadow-sm p-3'
                    {...register('category', { required: "Category is required" })}
                />
                {errors.category && <span className="text-red-500 text-sm">{errors.category.message}</span>}

                <Input
                    label='Weight (kg)'
                    type='number'
                    placeholder='Enter weight'
                    className='w-full border-gray-300 rounded-lg shadow-sm p-3'
                    {...register('weight', {
                        required: "Weight is required",
                        valueAsNumber: true,
                        min: { value: 1, message: "Weight must be greater than 0" }
                    })}
                />
                {errors.weight && <span className="text-red-500 text-sm">{errors.weight.message}</span>}
            </div>

            <div className='w-full md:w-1/2 flex flex-col gap-6'>
                <Input
                    label="Product Image:"
                    type="file"
                    className="border-gray-300 rounded-lg shadow-sm p-3"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                />
                {product?.productImage ? (
                    <div className="w-full">
                        <img
                            src={productService.getProductFilePreview(product.productImage)}
                            alt={product.title}
                            className="rounded-lg shadow-md"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No preview available</p>
                )}

                <Input
                    label='Pickup Address'
                    type='text'
                    placeholder='Enter full address (House No, Building, Street, City, State, Pincode)'
                    className='border-gray-300 rounded-lg shadow-sm p-3 h-[150px]'
                    {...register('pickupAddress', { required: "Pickup address is required" })}
                />
                {errors.pickupAddress && <span className="text-red-500 text-sm">{errors.pickupAddress.message}</span>}

                <Button type="submit" disabled={isSubmitting} className="w-full bg-green-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-green-700 transition">
                    {isSubmitting ? "Recycling..." : "Recycle Now"}
                </Button>
            </div>
        </form>
    )
}

export default RecycleForm;
