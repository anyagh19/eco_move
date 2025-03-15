import { Input, Button, Select } from '../Index'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import productService from '../appwrite/Product'

function RecycleForm({ product }) {
    const { register, handleSubmit,  setValue } = useForm({
        defaultValues: {
            title: '',
            category: '',
            Weight: '',
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
        if (isSubmitting)
            return;
        setIsSubmitting(true)

        try {
            console.log('recycle data', data)
            if (!userData) {
                console.log('login', error)
                toast.success('Login to Recycle', { position: 'top-center' })
            }
            let recycleFileID = null
            if (file) {
                console.log('file uploading')
                const uploadFile = await productService.uploadProductFile(file, userData.$id)
                recycleFileID = uploadFile.$id
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
                )
                if (dbProduct) {
                    console.log('Product donated:', dbProduct);
                    navigate(`/recycle-page`);
                    toast.success("🎉 Thanks for Recycling!", { position: "top-center" });
                    resetForm()
                }
            }
        } catch (error) {
            console.log('submit recycle', error)
        }
    }
    return (
        <form onSubmit={handleSubmit(submit)} className='w-full min-h-screen flex gap-5 py-5 px-7'>
            <div className='flex flex-col gap-6 w-[50%]'>
                <Input
                    label='Title:'
                    type='text'
                    placeholder='enter title'
                    className='w-full border py-3 px-5  '
                    {...register('title', {
                        required: true
                    })}
                />
                <Select
                    label='Category'
                    options={['paper', 'cardboard', 'metal', 'other']}
                    className='w-full border py-3 px-5  '
                    {...register('category', {
                        required: true
                    })}
                />
                <Input
                    label='Weight'
                    type='number'
                    placeholder='enter weight'
                    className='w-full border py-3 px-5  '
                    {...register('weight', {
                        required: true
                    })}
                />
            </div>
            <div className='w-[50%] flex flex-col gap-6'>
                <Input
                    label="Product Image :"
                    type="file"
                    className="mb-4  px-10 py-3 w-full"
                    onChange={(e) => setFile(e.target.files[0])}
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                // {...register("image", { required: !product })}
                />
                {product?.productImage ? (
                    <div className="w-full mb-4">
                        <img
                            src={productService.getProductFilePreview(product.productImage)}
                            alt={product.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <p className="text-gray-500">No preview available</p>
                )}
                <Input
                    label='address'
                    type='text'
                    placeholder='enter address(House No , building, Street Area - Town/Locality - City/District - State - Pincode)'
                    className='border  px-10 py-3 w-full h-[200px]'
                    {...register('pickupAddress', {
                        required: true
                    })}
                />
                <Button type="submit" disabled={isSubmitting} bgColor={product ? 'bg-green-300' : undefined} className="w-full bg-green-300">
                    Recycle
                </Button>
            </div>
        </form>
    )
}

export default RecycleForm